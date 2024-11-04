import { imageUrl } from '@/utils/imageUrl';
import { movieYear } from '@/utils/movieData';
import Image from 'next/image';
import { Movie } from '@/types/global';
import Link from 'next/link';
import { Rating } from '@/components/Elements/Rating';

interface TrendingMovieCardProps {
  movie: Movie;
}

export const TrendingMovieCard = ({ movie }: TrendingMovieCardProps) => {
  const year = movieYear(movie.release_date);

  return (
    <div className='w-full min-w-[340px] min-h-[176px] relative'>
      <div className='w-full min-h-[176px] bg-gray-800 rounded-xl overflow-hidden relative'>
        <Image
          src={imageUrl(movie.backdrop_path, 'w780')}
          alt='Cover Image'
          className='object-cover'
          fill
          sizes='auto'
        />
        <div className='absolute inset-0 bg-moviecard-gradient flex flex-col justify-between'>
          <div className='p-4 flex gap-2'>
            <span>{year}</span> ·
            <Rating rating={movie.vote_average} />
          </div>
          <div className='p-4 flex flex-col'>
            <h1 className='font-black text-2xl mb-4 truncate'>{movie.title}</h1>
            <Link
              href={`/movies/${movie.id}`}
              className='bg-[#4c5a67] hover:bg-[#fbd446] text-white text-center hover:text-black text-sm py-2 font-semibold rounded-md'
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      <div className='absolute -top-1 -right-1 z-20 w-auto min-h-[36px] font-black bg-white text-gray-500 px-5 py-2 rounded-tr-[20px] rounded-bl-[20px]'>
        Trending today
      </div>
    </div>
  );
};
