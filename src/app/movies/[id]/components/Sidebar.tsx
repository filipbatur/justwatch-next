import { Rating } from '@/components/Elements/Rating';
import { LargeSection } from './LargeSection';
import { TextSection } from './TextSection';
import Image from 'next/image';
import { imageUrl } from '@/utils/imageUrl';
import { movieRuntime } from '@/utils/movieData';
import { Movie, MovieGenre } from '@/types/global';
import { WatchlistButton } from '@/components/Watchlist';

interface SidebarProps {
  movie: Movie;
}

export const Sidebar = ({ movie }: SidebarProps) => {
  // Ensure credits is defined before accessing crew
  const director = movie?.credits?.crew?.find(
    (item) => item.job === 'Director'
  );

  return (
    <aside className='w-full max-w-[368px] flex-grow flex flex-col gap-6 -lg:max-w-none -lg:pb-8'>
      <div className='flex justify-between'>
        <LargeSection title='ABOUT THE MOVIE'>
          <TextSection title='DIRECTOR'>
            {director ? director.name : 'N/A'}
          </TextSection>
          <TextSection title='RATING'>
            <Rating rating={movie?.vote_average} />
          </TextSection>
        </LargeSection>
        <Image
          src={imageUrl(movie.poster_path, 'w185')}
          width={144}
          height={216}
          alt={`${movie.title} picture`}
          className='rounded-xl aspect-[2/3]'
          style={{ objectFit: 'cover' }}
        />
      </div>
      <WatchlistButton item={movie} />
      <TextSection title='GENRES' border>
        {movie.genres.map((item: MovieGenre, index) => (
          <span key={item.id}>
            {item.name}
            {index < movie.genres.length - 1 && ', '}
          </span>
        ))}
      </TextSection>
      <TextSection title='RUNTIME' border>
        {movieRuntime(movie.runtime)}
      </TextSection>
      <TextSection title='PRODUCTION COUNTRY' border>
        {movie.production_countries.length
          ? movie.production_countries[0].name
          : movie.origin_country[0]}
      </TextSection>
    </aside>
  );
};
