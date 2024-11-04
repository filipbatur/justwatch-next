interface ContentLayoutProps {
  children: React.ReactNode;
  fixed?: boolean;
}

export const ContentLayout = ({
  children,
  fixed = false
}: ContentLayoutProps) => {
  return (
    <div className={`w-full flex justify-center ${fixed && 'fixed'} mb-8`}>
      <div className='w-full max-w-[1380px] px-[2rem] -md:px-4'>{children}</div>
    </div>
  );
};
