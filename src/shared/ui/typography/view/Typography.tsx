import type { FC, JSX } from 'react';
import styles from './Typography.module.scss';
import classNames from 'classnames';
import type { TTypographyProps } from '../types/types';
import type { TVariants } from '@shared/types/types';

export const Typography: FC<TTypographyProps> = ({
  color = 'white',
  TIsUpper = true,
  children,
  onClick,
  className,
  variant = 'bodyText',
}) => {
  const Tags: Record<TVariants, keyof JSX.IntrinsicElements> = {
    h1: 'h1',
    bodyText: 'p',
    smallBodyText: 'p',
  };
  const TagName = Tags[variant];
  const classNamedGenerated = classNames(
    styles[variant],
    styles[color],
    { [styles.TIsUpper]: TIsUpper },
    className
  );
  return (
    <TagName onClick={onClick} className={classNamedGenerated}>
      {children}
    </TagName>
  );
};
