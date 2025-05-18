import type { FC } from 'react';
import styles from './NoteItem.module.scss';
import { IconPencil, IconTrash } from '../../assets/icons';
import { Typography } from '../../ui/typography/Typography';
import classNames from 'classnames';
import { CustomInput } from '../../ui/custom-input/CustomInput';
import type { TNoteItemProps } from '../../types/types';

export const NoteItem: FC<TNoteItemProps> = ({
  text,
  completed,
  deadline,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const getDeadlineStatus = (deadline: Date): string => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const diffAbs = Math.abs(diff);

    const minutes = Math.floor(diffAbs / (1000 * 60)) % 60;
    const hours = Math.floor(diffAbs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffAbs / (1000 * 60 * 60 * 24));

    const formatted = `${days}d ${hours}h ${minutes}m`;

    return diff > 0 ? `⏳ Left time: ${formatted}` : `⏱ Passed time: ${formatted}`;
  };
  return (
    <div className={styles.note}>
      <CustomInput
        type='checkbox'
        checked={completed}
        onChange={() => onStatusChange(!completed)}
      />
      <div className={styles.mainText}>
        {deadline && (
          <Typography
            variant='smallBodyText'
            color='textColor'
            TIsUpper={false}
          >
            {getDeadlineStatus(deadline)}
          </Typography>
        )}
        <Typography variant='bodyText' className={styles.text} color='textColor'>
          {text}
        </Typography>
      </div>

      <div className={styles.actions}>
        <IconPencil
          className={classNames(styles.icon, styles.pencil)}
          onClick={onEdit}
        />
        <IconTrash
          className={classNames(styles.icon, styles.trash)}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
