import { MoviesList } from './components/MoviesList';
import { Filters } from './components/Filters';
import { ContentLayout } from '@/components/Layouts';

export default async function Popular() {
  return (
    <ContentLayout>
      <Filters />
      <MoviesList />
    </ContentLayout>
  );
}
