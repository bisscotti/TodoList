import type { FC } from 'react'
import type { TMultiContainerProps } from '../../types/types'
import classNames from 'classnames';
import styles from './MultiContainer.module.scss';

export const MultiContainer: FC<TMultiContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};
