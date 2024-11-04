'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { ContentLayout } from '../Layouts';
import { Search } from '../Search';
import { Watchlist } from '../Watchlist';

export const Header = () => {
  const pathname = usePathname();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const isActive = (path: string) =>
    pathname === path
      ? `text-[#d9e8ed] font-bold ${isSearchActive && '-md:hidden'}`
      : `text-[#999c9f] hover:text-[#d5d5d5] ${isSearchActive && '-md:hidden'}`;

  return (
    <header className='w-full h-[56px] fixed z-[999] bg-[#060d17] -md:h-[100px]'>
      <ContentLayout>
        <div className='w-full h-[56px] flex justify-between items-center gap-8 -md:flex-col -md:h-[100px] -md:gap-0 -md:p-2 -md:pt-4'>
          <div className='-md:w-full flex justify-between'>
            <Link href='/'>
              <Image
                src='/assets/justwatch.webp'
                width={131}
                height={19}
                alt='Just watch logo'
              />
            </Link>
            <Link href='/watchlist' className='hidden -md:block'>
              <Bookmark size={24} fill='gray' color='gray' />
            </Link>
          </div>
          <div className='flex items-center justify-end gap-8 flex-grow text-[14px] -md:flex-grow-0 -md:w-full -md:gap-4'>
            <Link href='/' className={isActive('/')}>
              Home
            </Link>
            <Link href='/popular' className={isActive('/popular')}>
              Popular
            </Link>
            <Watchlist />
            <Search
              onFocus={() => setIsSearchActive(true)}
              mobileSearch={setIsSearchActive}
            />
          </div>
        </div>
      </ContentLayout>
    </header>
  );
};
