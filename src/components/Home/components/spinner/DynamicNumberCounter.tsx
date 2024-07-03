'use client';

import { MotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type CounterProps = {
  count: number;
  setCount?: Dispatch<SetStateAction<number>>;
  minValue?: number;
  modulo: number;
  boxPixelSize?: number;
};

export default function DynamicNumberCounter(props: CounterProps) {
  const { count, setCount, modulo, boxPixelSize } = props;
  const arrayOfNumbers = Array.from({ length: 3 }, (_, i) => {
    if (count + i <= 0) {
      return modulo - 1;
    }
    return count + i - 1;
  });
  const animatedValue = useSpring(count);

  useEffect(() => {
    animatedValue.set(count);
  }, [count, animatedValue]);

  return (
    <>
      <div
        style={{
          height: boxPixelSize ? `${boxPixelSize}px` : '3rem',
          width: boxPixelSize ? `${boxPixelSize + boxPixelSize / 3}px` : '4rem',
        }}
        className={twMerge(
          'relative overflow-hidden flex flex-col justify-center items-center',
          boxPixelSize
            ? `h-[${boxPixelSize}px] w-[${boxPixelSize}px]`
            : 'h-12 w-16',
        )}
      >
        {arrayOfNumbers.map((num) => (
          <Count
            num={String(num).padStart(2, '0')}
            mv={animatedValue}
            key={num}
            modulo={modulo}
            boxPixelSize={boxPixelSize}
          />
        ))}
      </div>
    </>
  );
}

function Count({
  num,
  mv,
  modulo,
  boxPixelSize,
}: {
  num: string;
  mv: MotionValue;
  modulo: number;
  boxPixelSize?: number;
}) {
  let y = useTransform(mv, (latestValue) => {
    if (boxPixelSize) {
      return boxPixelSize * (Number(num) - latestValue);
    }
    return 48 * (Number(num) - latestValue);
  });
  return (
    <motion.span
      style={{
        y: y,
        height: boxPixelSize ? `${boxPixelSize}px` : '3rem',
        width: boxPixelSize ? `${boxPixelSize}px` : '3rem',
      }}
      viewport={{ once: true }}
      key={num}
      className={twMerge(
        'absolute inset-0 text-center leading-[3rem]',
        boxPixelSize
          ? `h-[${boxPixelSize}px] w-[${boxPixelSize}px]`
          : 'h-12 w-12',
        String(num).includes('1') || String(num).includes('7') ? 'mx-auto' : '',
      )}
    >
      {num}
    </motion.span>
  );
}
