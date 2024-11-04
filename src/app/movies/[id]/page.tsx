import { fetchData } from '@/utils/fetch';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import { Hero } from './components/Hero';
import { ErrorBoundary } from '@/components/Elements/Error';
import { ContentLayout } from '@/components/Layouts';

interface MoviePageParams {
  params: { locale: string; id: string };
}

export default async function Movies({ params }: MoviePageParams) {
  const { data } = await fetchData(`movie/${params.id}`, {
    append_to_response: 'credits'
  });

  const movie = data;

  if (data?.success === false) {
    const error = data?.status_message;
    return <ErrorBoundary error={error} icon backButton page />;
  }

  return (
    <div className='relative pt-[56px] -md:pt-[100px]'>
      <Hero movie={movie} />
      <ContentLayout>
        <div className='w-full h-screen flex gap-[3rem] mt-[2rem] -lg:flex-col'>
          <Content movie={movie} />
          <Sidebar movie={movie} />
        </div>
      </ContentLayout>
    </div>
  );
}
