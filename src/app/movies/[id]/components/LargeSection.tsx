interface LargeSectionProps {
  title: string;
  children: React.ReactNode;
}

export const LargeSection = ({ title, children }: LargeSectionProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-anton text-[22px]'>{title}</h1>
      {children}
    </div>
  );
};
