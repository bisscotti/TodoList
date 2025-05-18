import classNames from 'classnames';
import { useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { Typography } from '../typography/Typography';
import { CustomButton } from '../custom-button/CustomButton';
import { CustomInput } from '../custom-input/CustomInput';
import type { TModalProps } from '../../types/types';

export const Modal: FC<TModalProps> = ({
  isOpen,
  onClose,
  title,
  className,
  inputTitle,
  inputDesc,
  setInputTitle,
  setInputDesc,
  onApply,
  createdAt,
  deadline,
  setDeadline,
}) => {
  const [errors, setErrors] = useState<{ title?: string; desc?: string; deadline?: string }>({});
  if (!isOpen) {
    return null;
  }
  const handleApply = () => {
    const newErrors: typeof errors = {};
    if (!inputTitle?.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!inputDesc?.trim()) {
      newErrors.desc = 'Description is required';
    }
    if (!deadline) {
      newErrors.deadline = 'Deadline requires date and time';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onApply?.();
  };

  return createPortal(
    <div
      className={classNames(styles.modalBackdrop, {
        [styles.visible]: isOpen,
      })}
      onClick={onClose}
    >
      <div
        className={classNames(styles.modalContent, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.innerModal}>
          {title && (
            <div className={styles.title}>
              <Typography variant='h1' color='textColor'>
                {title}
              </Typography>
            </div>
          )}
          <div className={styles.twoInputs}>
            <CustomInput
              type='text'
              placeholder='Input your title...'
              value={inputTitle}
              onChangeText={(e) => {setInputTitle?.(e.target.value); if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));}}
              error={errors.title}
            />
            <textarea
              className={styles.textarea}
              placeholder='Add description...'
              value={inputDesc}
              onChange={(e) => {
                setInputDesc?.(e.target.value);
                if (errors.desc) setErrors((prev) => ({ ...prev, desc: undefined }));
              }}
            />
            {errors.desc && (
              <Typography variant="smallBodyText" color="red" TIsUpper={false}>
                {errors.desc}
              </Typography>
            )}
          </div>
          <div className={styles.deadline}>
            <Typography
              variant='bodyText'
              color='textColor'
              TIsUpper={false}
            >
              Select deadline:
            </Typography>
            <CustomInput
              type='datetime-local'
              value={deadline ? new Date(deadline).toLocaleString() : undefined}
              className={styles.deadlineInput}
              onChangeDate={(e) => {
                setDeadline?.(e.target.value ? new Date(e.target.value) : undefined);
                if (errors.deadline) setErrors((prev) => ({ ...prev, deadline: undefined }));
              }}
              error={errors.deadline}
            />
          </div>
          <div className={styles.info}>
            {createdAt && (
              <Typography
                variant='smallBodyText'
                color='textColor'
                TIsUpper={false}
              >
                Created at: {new Date(createdAt).toLocaleString().slice(0, 17)}
              </Typography>
            )}
            {deadline && (
              <Typography variant='smallBodyText' color='textColor' TIsUpper={false}>
                Deadline: {deadline.toLocaleString().slice(0, 17)}
              </Typography>
            )}
          </div>
          <div className={styles.buttons}>
            <CustomButton
              TVariant='smallBodyText'
              variant='secondary'
              TColor='purple'
              TIsUpper
              className={styles.btn}
              onClick={onClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              TVariant='smallBodyText'
              variant='primary'
              TColor='white'
              TIsUpper
              className={styles.btn}
              onClick={handleApply}
            >
              Apply
            </CustomButton>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
