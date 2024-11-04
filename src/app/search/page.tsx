import { fetchData } from '@/utils/fetch';
import { Movie } from '@/types/global';
import { ErrorBoundary } from '@/components/Elements/Error';
import { MovieListItem } from '@/components/Elements/MovieListItem';
import { ContentLayout } from '@/components/Layouts';

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q;

  const { data } = await fetchData('search/movie', {
    query: searchQuery
  });

  const movies = data;

  if (data?.success === false) {
    const error = data?.status_message;
    return <ErrorBoundary error={error} />;
  }

  return (
    <ContentLayout>
      <div className='mt-[70px]-md:mt-[110px]'>
        <h1 className='text-[24px] font-bold mb-6'>
          Search Results for: {searchQuery}
        </h1>
        <div className='flex flex-col'>
          {movies &&
            movies.results.map((item: Movie) => (
              <MovieListItem key={item.id} movie={item} />
            ))}
        </div>
      </div>
    </ContentLayout>
  );
}
