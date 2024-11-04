'use client';

import { MovieListItem } from '@/components/Elements/MovieListItem';
import { useLocalStorageContext } from '@/lib/context/LocalStorageContext';
import { Movie } from '@/types/global';

export const Watchlist = () => {
  const { watchlist } = useLocalStorageContext();

  return (
    <div className='flex flex-col h-full'>
      {watchlist.length ? (
        watchlist.map((item: Movie) => (
          <MovieListItem key={item.id} movie={item} />
        ))
      ) : (
        <div className='flex items-center justify-center'>
          Your watchlist is empty
        </div>
      )}
    </div>
  );
};
