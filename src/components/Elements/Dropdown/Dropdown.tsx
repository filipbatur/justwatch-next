'use client';

import { useClickOutside } from '@/hooks/useOnClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRef } from 'react';

interface DropdownProps {
  title: string;
  children: React.ReactNode;
  active?: boolean;
}

export const Dropdown = ({ title, children, active }: DropdownProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { isToggleOn, toggle, toggleOff } = useToggle(false);

  useClickOutside(modalRef, toggleOff);

  return (
    <div className='relative' ref={modalRef}>
      <button
        onClick={() => toggle()}
        className={`flex items-end text-[#b9bdcc] px-2 py-1 rounded-[4px] ${active && 'bg-[#434f5b] text-white'}`}
      >
        {title}
        {isToggleOn ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div
        className={`z-10 mt-2 top-full absolute flex flex-col gap-6 p-6 rounded-md overflow-y-auto w-full min-w-[400px] max-w-[350px] bg-[#10161d] transition-opacity duration-150 ${
          isToggleOn ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
