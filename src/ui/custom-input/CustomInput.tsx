import { type ChangeEvent, type FC } from 'react';
import type { TCustomInputProps } from '../../types/types';
import styles from './CustomInput.module.scss';
import { IconSearch } from '../../assets/icons';
import classNames from 'classnames';
import { Typography } from '../typography/Typography';

export const CustomInput: FC<TCustomInputProps> = ({
  placeholder,
  iconSearch = false,
  className,
  value,
  checked,
  type = 'text',
  onChange,
  onChangeText,
  onChangeDate,
  error,
}) => {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(e);
  };
  return (
    <div className={styles.form}>
      {type === 'text' && (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleTextChange}
          className={classNames(styles.input, className,)}
        />
      )}
      {type === 'checkbox' && (
        <label className={styles.checkbox}>
          <input type='checkbox' checked={checked} onChange={onChange} />
          <span className={styles.checkmark}></span>
        </label>
      )}
      {type === 'datetime-local' && (
        <input
          type={type}
          value={value}
          className={classNames(styles.deadlineInput, )}
          onChange={onChangeDate}
        />
      )}
      {iconSearch && <IconSearch className={styles.iconSearch} />}
      {typeof error === 'string' && (
        <Typography variant='smallBodyText'color='red' TIsUpper={false}>{error}</Typography>
      )}
    </div>
  );
};
