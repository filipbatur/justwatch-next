import { Movie } from '@/types/global';
import { imageUrl } from '@/utils/imageUrl';
import { movieYear } from '@/utils/movieData';
import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '../Rating';
import { WatchlistButton } from '@/components/Watchlist';

interface MovieListItemProps {
  movie: Movie;
}

export const MovieListItem = ({ movie }: MovieListItemProps) => {
  return (
    <div key={movie.id} className='flex gap-4 border-b-2 border-[#111924] py-4'>
      <Link key={movie.id} href={`/movies/${movie.id}`}>
        <Image
          src={imageUrl(movie.poster_path, 'w185')}
          width={176}
          height={264}
          alt={`${movie.title} image`}
          className='rounded-xl aspect-[2/3] bg-[#0a151f] -md:min-w[80px] -md:w-[80px]'
          style={{ objectFit: 'cover', minWidth: '80px' }}
        />
      </Link>
      <div className='flex flex-col gap-2 w-full max-w-[500px]'>
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className='text-[22px]'
        >
          {movie.title}{' '}
          <span className='text-[16px] text-[#b9bdcc]'>
            ({movieYear(movie.release_date)})
          </span>
        </Link>
        <Rating rating={movie?.vote_average} />
        <div className='mr-auto mt-2'>
          <WatchlistButton item={movie} />
        </div>
      </div>
    </div>
  );
};
