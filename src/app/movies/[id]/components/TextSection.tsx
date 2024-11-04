interface TextSectionProps {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}

export const TextSection = ({
  title,
  children,
  border = false
}: TextSectionProps) => {
  return (
    <div
      className={`flex flex-col gap-1 ${border && 'border-t border-[#1c252f] pt-4'}`}
    >
      <h2 className='font-semibold text-[#6a7c8f]'>{title}</h2>
      <div className='text-[#d5d5d5]'>{children}</div>
    </div>
  );
};
