'use client';

import { useToggle } from '@/hooks/useToggle';
import { SearchBox } from './SearchBox';
import { useClickOutside } from '@/hooks/useOnClickOutside';
import { useEffect, useRef, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { fetchData } from '@/utils/fetch';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useLocalStorageContext } from '@/lib/context/LocalStorageContext';
import { addItem } from '@/utils/localStorageData';

interface SearchProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  mobileSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Search = ({ mobileSearch, ...props }: SearchProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const router = useRouter();

  const { setRecentSearches } = useLocalStorageContext();

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery) {
        addItem(searchQuery, setRecentSearches, 'recentSearches', 6);
      }
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, setRecentSearches]);

  const { data, isLoading } = useSWR(
    debouncedQuery ? `search/movie?query=${debouncedQuery}` : null,
    fetchData
  );

  const { isToggleOn, toggleOn, toggleOff } = useToggle(false);

  useClickOutside(modalRef, toggleOff);

  // Handling mobile search width
  useEffect(() => {
    if (mobileSearch) {
      mobileSearch(isToggleOn);
    }
  }, [isToggleOn, mobileSearch]);

  const handleToggleOn = () => {
    toggleOn();
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus(); // Only focus if input is not already focused
    }
  };

  const closeSearch = () => {
    setTimeout(() => {
      toggleOff();
    }, 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery) {
      event.preventDefault();
      toggleOff();
      inputRef.current?.blur();
      router.push(`/search?q=${searchQuery}`);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      toggleOff();
      inputRef.current?.blur();
    }

    if ((event.key === 'Tab' || event.key === 'ArrowDown') && isToggleOn) {
      event.preventDefault(); // Prevent default Tab behavior
      const firstLink = modalRef.current?.querySelector(
        '.link-item'
      ) as HTMLElement;
      firstLink?.focus();
    }
  };

  return (
    <div className='w-full' {...props}>
      {isToggleOn && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-10' />
      )}
      <div
        className='relative w-full z-20 text-[15px]'
        onClick={handleToggleOn}
        ref={modalRef}
      >
        <div
          className={`w-full flex items-center gap-3 bg-[#10161d] px-4 py-2 cursor-text ${isToggleOn ? 'rounded-t-md' : 'rounded-md'}`}
        >
          <SearchIcon size={20} color='#666666' />
          <input
            ref={inputRef}
            type='text'
            value={searchQuery}
            placeholder='Search for movies'
            className='w-full bg-[#10161d] outline-none'
            onFocus={handleToggleOn}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(event) => {
              handleKeyDown(event);
            }}
          />
          {searchQuery && isToggleOn && (
            <X
              size={20}
              className='cursor-pointer'
              onClick={() => setSearchQuery('')}
            />
          )}
        </div>
        {isToggleOn && (
          <SearchBox
            data={data?.data.results}
            loading={isLoading}
            onClose={closeSearch}
            inputRef={inputRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
    </div>
  );
};
