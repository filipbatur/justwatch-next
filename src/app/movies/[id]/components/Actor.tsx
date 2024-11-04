interface ActorProps {
  name: string;
  character: string;
}

export const Actor = ({ name, character }: ActorProps) => {
  return (
    <div className='flex flex-col items-start text-start text-sm bg-[#101924] px-4 py-2 rounded-md'>
      <span className='text-[#78a6b8]'>{name}</span>
      <span className='text-[#b9bdcc] font-semibold'>{character}</span>
    </div>
  );
};
