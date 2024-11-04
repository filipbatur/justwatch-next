'use client';

import { ResetButton } from '@/components/Elements/Button';
import { Dropdown } from '@/components/Elements/Dropdown';
import { Slider } from '@/components/Elements/Slider';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

const STEP = 0.1;
const MIN = 0;
const MAX = 10;

interface RatingProps {
  dropdown?: boolean;
}

export const Rating = ({ dropdown = true }: RatingProps) => {
  const [rating, setRating] = useQueryState('rating');
  const [values, setValues] = useState([MIN]);

  useEffect(() => {
    if (rating) {
      const parsedRating = Number(rating);
      setValues([parsedRating]);
    } else {
      setValues([MIN]);
    }
  }, [rating]);

  const handleChange = (newValue: number[]) => {
    if (newValue[0] === MIN) {
      setRating(null); // Set rating to null if the new value is 0
      setValues([MIN]);
    } else {
      const parsedRating = newValue.toString();
      setRating(parsedRating);
      setValues([newValue[0]]);
    }
  };

  const handleReset = () => {
    setRating(null);
    setValues([MIN]);
  };

  const filter = (
    <>
      <div className='flex justify-between items-end'>
        <h1 className='text-[20px] text-[#d5d5d5]'>Rating</h1>
        <ResetButton handleReset={handleReset} />
      </div>
      <Slider
        step={STEP}
        min={MIN}
        max={MAX}
        handlerFn={handleChange}
        values={values}
        setValues={setValues}
      />
    </>
  );

  return (
    <>
      {dropdown ? (
        <Dropdown title='Rating' active={rating ? true : false}>
          {filter}
        </Dropdown>
      ) : (
        filter
      )}
    </>
  );
};
