import type { FC } from 'react';
import classNames from 'classnames';
import styles from './MultiContainer.module.scss';
import type { TMultiContainerProps } from '../types/types';

export const MultiContainer: FC<TMultiContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};
