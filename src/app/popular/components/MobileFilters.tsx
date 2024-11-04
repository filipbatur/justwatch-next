import { Genres } from './Genres';
import { Rating } from './Rating';
import { YearRange } from './YearRange';

interface MobileFiltersProps {
  handleOpenFilters: () => void;
}

export const MobileFilters = ({ handleOpenFilters }: MobileFiltersProps) => {
  return (
    <div className='fixed w-[90vw] h-screen overflow-auto bg-[#060d17] z-[1000] p-4 top-0 left-0'>
      <div className='flex justify-between pb-8'>
        <h1 className='text-[20px]'>Filters</h1>
        <button onClick={handleOpenFilters}>Done</button>
      </div>
      <div className='flex flex-col gap-6'>
        <YearRange dropdown={false} />
        <Genres dropdown={false} />
        <Rating dropdown={false} />
      </div>
    </div>
  );
};
