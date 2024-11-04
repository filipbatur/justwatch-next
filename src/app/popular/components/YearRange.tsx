'use client';

import { ResetButton } from '@/components/Elements/Button';
import { Dropdown } from '@/components/Elements/Dropdown';
import { Slider } from '@/components/Elements/Slider';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

const STEP = 1;
const MIN = 1900;
const MAX = 2024;

interface YearRangeProps {
  dropdown?: boolean;
}

export const YearRange = ({ dropdown = true }: YearRangeProps) => {
  const [startYear, setStartYear] = useQueryState('release_date_from');
  const [endYear, setEndYear] = useQueryState('release_date_to');

  const [values, setValues] = useState([MIN, MAX]);

  useEffect(() => {
    if (startYear && endYear) {
      setValues([Number(startYear), Number(endYear)]);
    } else {
      setValues([MIN, MAX]);
    }
  }, [startYear, endYear]);

  const handleReset = () => {
    setStartYear(null);
    setEndYear(null);
    setValues([MIN, MAX]);
  };

  const handleChange = (newValues: number[]) => {
    const sorted = newValues.sort((a, b) => a - b);

    if (sorted[0] === MIN && sorted[1] === MAX) {
      handleReset();
    } else {
      setStartYear(sorted[0].toString());
      setEndYear(sorted[1].toString());
      setValues(sorted);
    }
  };

  const filter = (
    <>
      <div className='flex justify-between items-end'>
        <h1 className='text-[20px] text-[#d5d5d5]'>Release year</h1>
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
        <Dropdown
          title='Release year'
          active={startYear && endYear ? true : false}
        >
          {filter}
        </Dropdown>
      ) : (
        filter
      )}
    </>
  );
};
