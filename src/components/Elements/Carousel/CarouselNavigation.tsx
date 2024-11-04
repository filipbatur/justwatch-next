'use client';

import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselNavigationProps {
  emblaApi: CarouselApi;
}

export const CarouselNavigation = ({ emblaApi }: CarouselNavigationProps) => {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const checkDisabled = () => {
      if (emblaApi) {
        setPrevDisabled(!emblaApi.canScrollPrev());
        setNextDisabled(!emblaApi.canScrollNext());
      }
    };

    checkDisabled();
    emblaApi.on('reInit', checkDisabled).on('select', checkDisabled);
  }, [emblaApi]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='absolute flex justify-between w-full h-[100%] -md:hidden'>
      <button
        type='button'
        disabled={prevDisabled}
        onClick={onPrevButtonClick}
        className={`navigation-button z-50 bg-black/70 text-white transition-opacity duration-300 ${
          prevDisabled
            ? 'invisible'
            : 'group-hover:visible opacity-0 group-hover:opacity-100'
        }`}
      >
        <ChevronLeft size={35} />
      </button>
      <button
        type='button'
        disabled={nextDisabled}
        onClick={onNextButtonClick}
        className={`navigation-button z-50 bg-black/70 text-white transition-opacity duration-300 ${
          nextDisabled
            ? 'invisible'
            : 'group-hover:visible opacity-0 group-hover:opacity-100'
        }`}
      >
        <ChevronRight size={35} />
      </button>
    </div>
  );
};
