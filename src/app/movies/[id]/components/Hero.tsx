import { Rating } from '@/components/Elements/Rating';
import { ContentLayout } from '@/components/Layouts';
import { Movie } from '@/types/global';
import { imageUrl } from '@/utils/imageUrl';
import { movieRuntime, movieYear } from '@/utils/movieData';
import Image from 'next/image';

interface HeroProps {
  movie: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  return (
    <div className='w-full flex justify-end bg-[#0c131e]'>
      <div className='w-full max-w-[720px] h-[250px] relative'>
        <Image
          src={imageUrl(movie.backdrop_path, 'w1280')}
          alt='Cover Image'
          className='object-cover'
          fill
        />
        <div className='absolute inset-0 w-full max-w-[720px] h-[250px] bg-backdrop-gradient'></div>
      </div>

      <div className='w-full absolute left-0'>
        <ContentLayout>
          <div className='py-[3rem] flex flex-col gap-6'>
            <div className='font-anton flex items-end gap-2'>
              <h1 className='text-[32px] leading-9'>
                {movie.title.toUpperCase()}
              </h1>
              <h2 className='text-[#6f7d90]'>
                [{movieYear(movie.release_date)}]
              </h2>
            </div>
            <div className='flex gap-2'>
              <Rating rating={movie?.vote_average} /> -{' '}
              <span>{movieRuntime(movie.runtime)}</span>
            </div>
          </div>
        </ContentLayout>
      </div>
    </div>
  );
};
