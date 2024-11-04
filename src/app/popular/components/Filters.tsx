'use client';

import { useQueryState } from 'nuqs';
import { Genres } from './Genres';
import { Rating } from './Rating';
import { YearRange } from './YearRange';
import { FilterIcon } from 'lucide-react';
import { ResetButton } from '@/components/Elements/Button';
import { useState } from 'react';
import { MobileFilters } from './MobileFilters';

export const Filters = () => {
  /* eslint-disable */
  const [startYear, setStartYear] = useQueryState('release_date_from');
  const [endYear, setEndYear] = useQueryState('release_date_to');
  const [genres, setGenres] = useQueryState('genres');
  const [rating, setRating] = useQueryState('rating');
  /* eslint-enable */

  const [mobileFilters, setMobileFilters] = useState(false);

  const handleResetFilters = () => {
    setStartYear(null);
    setEndYear(null);
    setGenres(null);
    setRating(null);
  };

  const handleOpenMobileFilters = () => {
    setMobileFilters((prev) => !prev);
  };

  return (
    <div className='flex justify-between mt-[70px] -md:mt-[110px]'>
      <div className='flex gap-4'>
        <button
          onClick={handleOpenMobileFilters}
          className='flex items-center text-[#4c5a67] font-bold py-1 pointer-events-none -md:pointer-events-auto -md:text-[#b9bdcc]'
        >
          <FilterIcon size={16} />
          <span>FILTERS</span>
        </button>

        {mobileFilters && (
          <MobileFilters handleOpenFilters={handleOpenMobileFilters} />
        )}

        <div className='-md:hidden flex gap-4'>
          <YearRange />
          <Genres />
          <Rating />
        </div>
      </div>
      <ResetButton handleReset={handleResetFilters} />
    </div>
  );
};
