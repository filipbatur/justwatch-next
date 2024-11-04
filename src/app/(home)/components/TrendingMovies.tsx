import { fetchData } from '@/utils/fetch';
import { FetchOptions, Movie } from '@/types/global';
import { TrendingMovieCard } from './TrendingMovieCard';
import { Carousel } from '@/components/Elements/Carousel';
import { ErrorBoundary } from '@/components/Elements/Error';
import { ContentLayout } from '@/components/Layouts';

interface TrendingMoviesProps {
  endpoint: string;
  options?: FetchOptions;
}

export default async function TrendingMovies({
  endpoint,
  options
}: TrendingMoviesProps) {
  const { data } = await fetchData(endpoint, options);

  const movies = data;

  if (data?.success === false) {
    const error = data?.status_message;
    return <ErrorBoundary error={error} />;
  }

  return (
    <ContentLayout>
      <Carousel>
        <div className='flex gap-8'>
          {movies &&
            movies.results
              .slice(0, 3)
              .map((item: Movie) => (
                <TrendingMovieCard key={item.id} movie={item} />
              ))}
        </div>
      </Carousel>
    </ContentLayout>
  );
}
