'use client';

import { ResetButton } from '@/components/Elements/Button';
import { fetchData } from '@/utils/fetch';
import { MovieGenre } from '@/types/global';
import { Check } from 'lucide-react';
import { useQueryState } from 'nuqs';
import useSWR from 'swr';
import { Dropdown } from '@/components/Elements/Dropdown';

const fetcher = (url: string) => fetchData(url).then((res) => res.data);

interface GenresProps {
  dropdown?: boolean;
}

export const Genres = ({ dropdown = true }: GenresProps) => {
  const { data } = useSWR('genre/movie/list', fetcher);
  const [genres, setGenres] = useQueryState('genres');

  const currentGenres = genres ? genres.split(',').map(Number) : [];

  const handleSetGenres = (id: number) => {
    if (currentGenres.includes(id)) {
      const updatedGenres = currentGenres.filter((g) => g !== id);
      setGenres(updatedGenres.length > 0 ? updatedGenres.join(',') : null);
    } else {
      const updatedGenres = [...currentGenres, id];
      setGenres(updatedGenres.join(','));
    }
  };

  const handleReset = () => {
    setGenres(null);
  };

  const filter = (
    <>
      <div className='flex justify-between items-end'>
        <h1 className='text-[20px] text-[#d5d5d5]'>Genres</h1>
        <ResetButton handleReset={handleReset} />
      </div>
      <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
        {data &&
          data.genres.map((item: MovieGenre) => {
            const isActive = currentGenres.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSetGenres(item.id)}
                className={`text-left text-[15px] flex items-center gap-1 py-1 px-2 rounded-[4px] ${
                  isActive && 'bg-[#434f5b]'
                }`}
              >
                <Check
                  size={20}
                  className={isActive ? 'text-white' : 'text-[#323740]'}
                />
                {item.name}
              </button>
            );
          })}
      </div>
    </>
  );

  return (
    <>
      {dropdown ? (
        <Dropdown title='Genres' active={genres ? true : false}>
          {filter}
        </Dropdown>
      ) : (
        filter
      )}
    </>
  );
};
