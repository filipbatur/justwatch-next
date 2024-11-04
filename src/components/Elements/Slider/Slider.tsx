import { getTrackBackground, Range } from 'react-range';

interface SliderProps {
  step: number;
  min: number;
  max: number;
  handlerFn: (values: number[]) => void;
  values: number[];
  setValues: (values: number[]) => void;
}

export const Slider = ({
  step,
  min,
  max,
  handlerFn,
  values,
  setValues
}: SliderProps) => {
  return (
    <div className='flex items-center gap-4 text-xs text-[#d5d5d5]'>
      <span>{min}</span>
      <Range
        allowOverlap
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => setValues(values)}
        onFinalChange={(values) => handlerFn(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '2px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors:
                    values.length > 1
                      ? ['#1f2730', '#4c5a67', '#1f2730']
                      : ['#1f2730', '#4c5a67'],
                  min: min,
                  max: max
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isDragged && (
              <div
                style={{
                  position: 'absolute',
                  top: '-28px',
                  color: '#d5d5d5',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#4c5a67'
                }}
              >
                {values[index]}
              </div>
            )}
            <div
              style={{
                height: '12px',
                width: '12px',
                borderRadius: '100%',
                backgroundColor: '#4c5a67'
              }}
            />
          </div>
        )}
      />
      <span>{max}</span>
    </div>
  );
};
