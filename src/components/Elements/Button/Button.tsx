import Link from 'next/link';
import { Spinner } from '../Spinner';

const colors = {
  primary:
    'bg-[#4c5a67] hover:bg-[#fbd446] text-white hover:text-black text-sm py-2',
  secondary: 'bg-[#222c38] hover:bg-[#4a5460] text-white px-4 py-3 h-[48px]'
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: keyof typeof colors;
  link?: string;
}

export const Button = ({
  label,
  variant = 'secondary',
  link,
  ...props
}: ButtonProps) => {
  return (
    <>
      {' '}
      {link ? (
        <Link
          href={link}
          className={`${colors[variant]} font-semibold rounded-md`}
        >
          {label}
        </Link>
      ) : (
        <button
          className={`${colors[variant]} font-semibold rounded-md flex items-center justify-center`}
          {...props}
        >
          {label ? label : <Spinner size='small' />}
        </button>
      )}
    </>
  );
};
