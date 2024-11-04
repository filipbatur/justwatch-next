'use client';

import { useClickOutside } from '@/hooks/useOnClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { useLocalStorageContext } from '@/lib/context/LocalStorageContext';
import { Movie } from '@/types/global';
import { imageUrl } from '@/utils/imageUrl';
import { movieYear } from '@/utils/movieData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export const Watchlist = () => {
  const modalRef = useRef(null);
  const { isToggleOn, toggle, toggleOff } = useToggle(false);
  useClickOutside(modalRef, toggleOff);

  const pathname = usePathname();

  const { watchlist } = useLocalStorageContext();

  return (
    <div className='relative -md:hidden' ref={modalRef}>
      <button
        onClick={toggle}
        className={`flex items-end text-[#999c9f] rounded-[4px] ${pathname === '/watchlist' && 'text-[#d9e8ed] font-bold'}`}
      >
        Watchlist
        {isToggleOn ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div
        className={`z-10 mt-2 top-full absolute flex flex-col gap-6 p-6 rounded-md w-full min-w-[400px] max-w-[350px] max-h-[450px] bg-[#10161d] transition-opacity duration-150 ${
          isToggleOn ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex flex-col'>
          {watchlist && watchlist.length > 0 ? (
            watchlist.slice(0, 4).map((item: Movie) => (
              <Link
                href={`/movies/${item.id}`}
                key={item.id}
                className='link-item w-full flex gap-4 p-1 rounded-md items-center hover:bg-[#1c252f] focus:bg-[#1c252f] focus:outline-none'
                onClick={toggleOff}
                tabIndex={0}
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
            ))
          ) : (
            <span>Your watchlist is empty</span>
          )}
        </div>
        <Link href='/watchlist' onClick={toggleOff} className='text-[#78a6b8]'>
          View full watchlist
        </Link>
      </div>
    </div>
  );
};
