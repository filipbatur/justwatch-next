import { SectionWrapper } from './components/SectionWrapper';
import MoviesList from '@/app/(home)/components/MoviesList';
import TrendingMovies from './components/TrendingMovies';
import TopLists from './components/TopLists';

export default async function Home() {
  return (
    <div className='flex flex-col pt-[80px] -md:pt-[110px]'>
      <TrendingMovies endpoint='trending/movie/day?language=en-US' />
      <SectionWrapper title="Today's Top Lists">
        <TopLists />
      </SectionWrapper>
      <SectionWrapper title='Now Playing'>
        <MoviesList endpoint='movie/now_playing' />
      </SectionWrapper>
      <SectionWrapper title='Top Rated Movies'>
        <MoviesList endpoint='movie/top_rated' numbered />
      </SectionWrapper>
      <SectionWrapper title='Trending This Week'>
        <MoviesList endpoint='trending/movie/week?language=en-US' />
      </SectionWrapper>
      <SectionWrapper title='Top Action Movies'>
        <MoviesList endpoint='discover/movie' options={{ with_genres: 28 }} />
      </SectionWrapper>
      <SectionWrapper title='Animated Movies'>
        <MoviesList endpoint='discover/movie' options={{ with_genres: 16 }} />
      </SectionWrapper>
      <SectionWrapper title='Westerns'>
        <MoviesList endpoint='discover/movie' options={{ with_genres: 37 }} />
      </SectionWrapper>
    </div>
  );
}
