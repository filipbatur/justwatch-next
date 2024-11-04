import { ContentLayout } from '@/components/Layouts';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const SectionWrapper = ({ title, children }: SectionWrapperProps) => {
  return (
    <ContentLayout>
      <h1 className='text-[28px] font-bold mb-6'>{title}</h1>
      {children}
    </ContentLayout>
  );
};
