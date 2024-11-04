import { Button } from '@/components/Elements/Button';
import Image from 'next/image';

function NotFoundPage() {
  return (
    <div className='flex flex-col h-[90vh] gap-4 items-center justify-center'>
      <Image src='/assets/reel.webp' width={100} height={100} alt='Reel logo' />
      Page not found
      <Button label='Back to Homepage' variant='secondary' link='/' />
    </div>
  );
}

export default NotFoundPage;
