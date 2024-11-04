import { Carousel } from '@/components/Elements/Carousel';
import MovieTopList from './MovieTopList';

export default async function TopLists() {
  return (
    <Carousel>
      <div className='flex'>
        <MovieTopList provider='Netflix' />
        <MovieTopList provider='Disney Plus' />
        <MovieTopList provider='Max' />
        <MovieTopList provider='Amazon Prime Video' />
      </div>
    </Carousel>
  );
}
