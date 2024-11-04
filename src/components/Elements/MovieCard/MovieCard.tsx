import { WatchlistButton } from '@/components/Watchlist';
import { Movie } from '@/types/global';
import { imageUrl } from '@/utils/imageUrl';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
  width?: string;
}

const MovieCard = ({ movie, width = '100vw' }: MovieCardProps) => {
  return (
    <div className='relative overflow-hidden min-w-[170px] aspect-[2/3]'>
      <div className='absolute left-1 -top-[3px]'>
        <WatchlistButton item={movie} type='icon' />
      </div>
      <Link
        href={`movies/${movie.id}`}
        className='flex flex-col items-center min-w-[170px] bg-[#0a151f] aspect-[2/3] rounded-xl'
        key={movie.id}
      >
        <Image
          src={imageUrl(movie.poster_path, 'w185')}
          width={0}
          height={0}
          alt={`${movie.title} picture`}
          className='rounded-xl'
          sizes='100vw'
          style={{ width: width, height: '100%', objectFit: 'cover' }}
        />
      </Link>
    </div>
  );
};

export default MovieCard;
