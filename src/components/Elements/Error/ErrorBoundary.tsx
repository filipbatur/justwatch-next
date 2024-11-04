'use client';

import Image from 'next/image';
import { Spinner } from '../Spinner/Spinner';
import { Button } from '../Button';

interface ErrorBoundaryProps {
  isLoading?: boolean;
  error: string;
  icon?: boolean;
  backButton?: boolean;
  page?: boolean;
}

export const ErrorBoundary = ({
  isLoading,
  error,
  icon = false,
  backButton = false,
  page = false
}: ErrorBoundaryProps) => {
  return (
    <div
      className={`${page ? 'h-[70vh]' : 'h-[250px]'} w-full min-h-[200px] flex flex-grow items-center justify-center`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col gap-4 items-center justify-center'>
          {icon && (
            <Image
              src='/assets/reel.webp'
              width={100}
              height={100}
              alt='Reel logo'
            />
          )}
          {error}
          {backButton && (
            <Button label='Back to Homepage' variant='secondary' link='/' />
          )}
        </div>
      )}
    </div>
  );
};
