import React, { useRef, useEffect } from 'react';
import { imageUrl } from '@/utils/imageUrl';
import { movieYear } from '@/utils/movieData';
import Image from 'next/image';
import Link from 'next/link';
import { Suggestions } from './Suggestions';
import { useRouter } from 'next/navigation';
import { ChevronsRight } from 'lucide-react';
import { Movie, Movies } from '@/types/global';
import { Spinner } from '../Elements/Spinner';

interface SearchBoxProps {
  data: Movies;
  loading: boolean;
  onClose: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBox = ({
  data,
  loading,
  onClose,
  inputRef,
  searchQuery,
  setSearchQuery
}: SearchBoxProps) => {
  const router = useRouter();

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, data?.length || 0);
  }, [data]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % linkRefs.current.length;
      linkRefs.current[nextIndex]?.focus();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex =
        (index - 1 + linkRefs.current.length) % linkRefs.current.length;
      linkRefs.current[prevIndex]?.focus();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 100);
    }
  };

  const handleClick = () => {
    onClose();
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 100);
  };

  const handleAllResults = () => {
    onClose();
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 100);
    router.push(`/search?q=${searchQuery}`);
  };

  const searchResults = data?.slice(0, 4).map((item: Movie, index: number) => (
    <Link
      href={`/movies/${item.id}`}
      key={item.id}
      className='link-item w-full flex gap-4 p-1 rounded-md items-center hover:bg-[#1c252f] focus:bg-[#1c252f] focus:outline-none'
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(event) => handleKeyDown(event, index)}
      ref={(el) => {
        linkRefs.current[index] = el;
      }}
      role='link'
    >
      <Image
        src={imageUrl(item.poster_path, 'w185')}
        width={46}
        height={69}
        alt={`${item.title} picture`}
        className='rounded-md bg-gray-800'
        sizes='100vw'
        style={{ objectFit: 'cover' }}
      />
      <div>
        <div className='text-[18px]'>{item.title}</div>
        <span className='text-[#b9bdcc] text-[14px]'>
          movie, {movieYear(item.release_date)}
        </span>
      </div>
    </Link>
  ));

  return (
    <div className='absolute w-full max-h-[500px] bg-[#10161d] p-6 rounded-b-md overflow-y-auto'>
      <div className='flex flex-col gap-4'>
        {data && searchResults}

        {data && (
          <button
            onClick={handleAllResults}
            className='text-[#78a6b8] flex justify-center items-end'
          >
            <span>See all results for {searchQuery}</span>{' '}
            <ChevronsRight size={18} />
          </button>
        )}

        {!data && !loading && <Suggestions setSearchQuery={setSearchQuery} />}

        {loading && (
          <div className='flex justify-center items-center'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
