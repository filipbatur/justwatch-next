import { Movie } from '@/types/global';
import { LargeSection } from './LargeSection';
import { Actor } from './Actor';
import { Carousel } from '@/components/Elements/Carousel';

interface ContentProps {
  movie: Movie;
}

export const Content = ({ movie }: ContentProps) => {
  const cast = movie?.credits?.cast
    .slice(0, 6)
    .map((item) => (
      <Actor key={item.id} name={item.name} character={item.character} />
    ));

  return (
    <section className='w-full flex-grow flex flex-col gap-[5rem]'>
      <LargeSection title='SYNOPSIS'>
        <h2 className='font-semibold text-[#f7f7f8]'>{movie.tagline}</h2>
        <p className='text-[#b9bdcc]'>{movie.overview}</p>
      </LargeSection>
      <LargeSection title='TOP CAST'>
        <Carousel>
          <div className='flex gap-4'>{cast}</div>
        </Carousel>
      </LargeSection>
    </section>
  );
};
