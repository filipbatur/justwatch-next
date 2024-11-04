import Image from 'next/image';

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <div className='flex gap-2'>
      <Image src='/assets/tmdb.svg' width={30} height={24} alt='Tmdb logo' />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};
