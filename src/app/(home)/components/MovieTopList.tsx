import { fetchData } from '@/utils/fetch';
import { Movie } from '@/types/global';
import Image from 'next/image';
import { imageUrl } from '@/utils/imageUrl';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/Elements/Error';

interface MovieTopListProps {
  provider: 'Netflix' | 'Disney Plus' | 'Max' | 'Amazon Prime Video';
}

const streamingProviders = {
  Netflix: {
    id: 8,
    asset: '/assets/netflix.webp'
  },
  'Disney Plus': {
    id: 337,
    asset: '/assets/disney.webp'
  },
  Max: {
    id: 1899,
    asset: '/assets/max.webp'
  },
  'Amazon Prime Video': {
    id: 119,
    asset: '/assets/amazon.webp'
  }
};

export default async function MovieTopList({ provider }: MovieTopListProps) {
  const { data } = await fetchData('discover/movie', {
    watch_region: 'HR',
    with_watch_providers: streamingProviders[provider].id
  });

  const movies = data;

  if (data?.success === false) {
    const error = data?.status_message;
    return <ErrorBoundary error={error} />;
  }

  return (
    <div className='flex flex-col gap-2 flex-1 pr-4 min-w-[400px]'>
      <div className='flex items-center gap-2'>
        <Image
          src={streamingProviders[provider].asset}
          width={48}
          height={48}
          alt={`${provider} picture`}
          className='rounded-md'
          sizes='100vw'
        />
        <h1 className='text-[28px] font-bold'>{provider}</h1>
      </div>
      <div className='flex flex-col'>
        {movies &&
          movies.results.slice(0, 3).map((item: Movie, index: number) => (
            <Link
              href={`movies/${item.id}`}
              key={item.id}
              className='flex items-center'
            >
              <span className='text-[60px] text-[#222c38] font-black -mr-1'>
                {index + 1}
              </span>
              <Image
                src={imageUrl(item.poster_path, 'w185')}
                width={48}
                height={72}
                alt={`${item.title} picture`}
                className='rounded-sm apsect-[2/3]'
                style={{ objectFit: 'cover' }}
              />
              <h2 className='text-[18px] font-bold ml-4'>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}
