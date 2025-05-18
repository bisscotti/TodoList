import type { FC } from 'react';
import type { TCustomButtonProps } from '../../types/types';
import classNames from 'classnames';
import { Typography } from '../typography/Typography';
import styles from './CustomButton.module.scss';

export const CustomButton: FC<TCustomButtonProps> = ({
  children,
  className,
  variant = 'primary',
  pressed = false,
  disabled = false,
  isTextBtn = true,
  onClick,
  TColor,
  TIsUpper,
  TVariant = 'bodyText',
}) => {
  const buttonClasses = classNames(
    styles.button,
    styles[variant],
    {
      [styles.disabled]: disabled,
      [styles.pressed]: pressed,
    },
    className
  );
  const buttonProps = { onClick, disabled };

  return (
    <button className={buttonClasses} {...buttonProps}>
      {isTextBtn ? (
        <Typography
          variant={TVariant}
          color={TColor ? TColor : 'white'}
          TIsUpper={TIsUpper}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </button>
  );
};
