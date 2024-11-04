import { fetchData } from '@/utils/fetch';
import { FetchOptions, Movie } from '@/types/global';
import { Carousel } from '@/components/Elements/Carousel';
import { ErrorBoundary } from '@/components/Elements/Error';
import MovieCard from '@/components/Elements/MovieCard/MovieCard';

interface MoviesListProps {
  endpoint: string;
  options?: FetchOptions;
  numbered?: boolean;
}

export default async function MoviesList({
  endpoint,
  options,
  numbered = false
}: MoviesListProps) {
  const { data } = await fetchData(endpoint, options);

  const movies = data;

  const movieInstance = (item: Movie, index: number) =>
    numbered ? (
      <div className='flex items-end'>
        <span className='text-[180px] leading-[180px] text-[#222c38] font-black -mr-5'>
          {index + 1}
        </span>
        <MovieCard movie={item} key={item.id} />
      </div>
    ) : (
      <MovieCard movie={item} key={item.id} />
    );

  if (data?.success === false) {
    const error = data?.status_message;
    return <ErrorBoundary error={error} />;
  }

  return (
    <Carousel>
      <div className='flex gap-4'>
        {movies &&
          movies?.results.map((item: Movie, index: number) =>
            movieInstance(item, index)
          )}
      </div>
    </Carousel>
  );
}
