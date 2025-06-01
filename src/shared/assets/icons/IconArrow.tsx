import type { FC } from 'react';
import type { TIconProps } from '../../types/types';

export const IconArrow: FC<TIconProps> = ({
  width = 9,
  height = 5,
  color = '#F7F7F7',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 9 5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M4.63074 1L7.99997 4'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.26154 4L4.63077 1'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
