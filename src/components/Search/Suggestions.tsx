import { fetchData } from '@/utils/fetch';
import { useLocalStorageContext } from '@/lib/context/LocalStorageContext';
import { Movie } from '@/types/global';
import { clearData } from '@/utils/localStorageData';
import { Search } from 'lucide-react';
import useSWR from 'swr';

interface SuggestionsProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Suggestions = ({ setSearchQuery }: SuggestionsProps) => {
  const { data } = useSWR('trending/movie/week?language=en-US', fetchData);

  const { recentSearches, setRecentSearches } = useLocalStorageContext();

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col mb-[30px]'>
        <div className='flex justify-between text-[#8c8c8c] text-[16px]'>
          <span>
            {recentSearches.length ? 'Recent searches' : 'No recent searches'}
          </span>
          {recentSearches.length ? (
            <button
              onClick={() => clearData(setRecentSearches, 'recentSearches')}
            >
              Clear all
            </button>
          ) : null}
        </div>
        <div className='flex flex-wrap gap-3 mt-[15px]'>
          {recentSearches &&
            recentSearches.map((item: string, index: number) => (
              <button
                key={index}
                className='link-item flex gap-2 border border-[#383d47] rounded-md px-2 py-1'
                onClick={() => setSearchQuery(item)}
              >
                <Search size={18} color='#383d47' />
                <span className='text-[13px] font-bold'>{item}</span>
              </button>
            ))}
        </div>
      </div>
      <div>
        <span className='text-[16px]'>Trending searches</span>
        <div className='flex flex-wrap gap-3 mt-[15px]'>
          {data?.data.results &&
            data?.data.results.slice(0, 6).map((item: Movie) => (
              <button
                key={item.id}
                className='link-item flex gap-2 border border-[#383d47] rounded-md px-2 py-1'
                onClick={() => setSearchQuery(item.title)}
              >
                <Search size={18} color='#383d47' />
                <span className='text-[13px] font-bold text-start'>
                  {item.title}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
