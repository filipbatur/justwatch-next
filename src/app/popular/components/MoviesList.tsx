'use client';

import { useEffect, useRef } from 'react';
import { fetchData } from '@/utils/fetch';
import useSWRInfinite from 'swr/infinite';
import { useQueryState } from 'nuqs';
import { ErrorBoundary } from '@/components/Elements/Error';
import MovieCard from '@/components/Elements/MovieCard/MovieCard';

const MOVIES_ENDPOINT = 'discover/movie';

export const MoviesList = () => {
  const [genres] = useQueryState('genres');
  const [startYear] = useQueryState('release_date_from');
  const [endYear] = useQueryState('release_date_to');
  const [rating] = useQueryState('rating');

  const fetcher = async (
    url: string,
    pageIndex: number,
    genres: string | null,
    startYear: number | string | null,
    endYear: number | string | null,
    rating: string | null
  ) => {
    const options = {
      page: pageIndex + 1,
      ...(genres && { with_genres: genres }),
      ...(startYear && { 'primary_release_date.gte': `${startYear}-01-01` }),
      ...(endYear && { 'primary_release_date.lte': `${endYear}-12-31` }),
      ...(rating && { 'vote_average.gte': rating })
    };
    const res = await fetchData(url, options);
    return res.data;
  };

  const { data, setSize, isLoading } = useSWRInfinite(
    (pageIndex) => [
      MOVIES_ENDPOINT,
      pageIndex,
      genres,
      startYear,
      endYear,
      rating
    ],
    ([url, pageIndex, genres, startYear, endYear, rating]) =>
      fetcher(url, pageIndex, genres, startYear, endYear, rating)
  );

  const movies = data ? data.flatMap((page) => page.results) : [];
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setSize((size) => size + 1);
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [setSize, isLoading]);

  if (isLoading || data?.[0].success === false) {
    const error = data?.[0].status_message;
    return (
      <ErrorBoundary error={error} isLoading={isLoading} icon backButton page />
    );
  }

  return (
    <div className='flex flex-col grow rounded-xl pt-8'>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '1rem'
        }}
      >
        {movies.length
          ? movies.map((item) => <MovieCard movie={item} key={item.id} />)
          : 'No movies available.'}
      </div>
      <div ref={loadMoreRef} style={{ height: '1px' }} />
    </div>
  );
};

export default MoviesList;
