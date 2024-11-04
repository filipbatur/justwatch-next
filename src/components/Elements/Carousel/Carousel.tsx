'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { CarouselNavigation } from './CarouselNavigation';

interface CarouselProps {
  children: React.ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    align: 'end',
    skipSnaps: true,
    breakpoints: {
      '(max-width: 640px)': { dragFree: true }
    }
  });

  return (
    <div className='w-full relative group'>
      <CarouselNavigation emblaApi={emblaApi} />
      <div className='w-full overflow-hidden' ref={emblaRef}>
        {children}
      </div>
    </div>
  );
};
