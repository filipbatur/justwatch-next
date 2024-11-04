import { ContentLayout } from '@/components/Layouts';
import { Watchlist } from './components/Watchlist';

export default async function WatchlistPage() {
  return (
    <ContentLayout>
      <div className='mt-[70px] h-full -md:mt-[110px]'>
        <h1 className='text-[24px] font-bold mb-6'>Your watchlist:</h1>
        <Watchlist />
      </div>
    </ContentLayout>
  );
}
