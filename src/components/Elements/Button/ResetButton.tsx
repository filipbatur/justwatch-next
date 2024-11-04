import { X } from 'lucide-react';

interface ResetButtonProps {
  handleReset: () => void;
}

export const ResetButton = ({ handleReset }: ResetButtonProps) => {
  return (
    <button onClick={handleReset} className='flex items-center text-[#4c5a67]'>
      <X size={14} />
      <span className='text-[14px] font-bold'>RESET</span>
    </button>
  );
};
