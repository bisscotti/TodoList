import { useRef, useState, type ChangeEvent, type FC } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

import type { THeaderProps } from '../types/types';
import type { Filter } from '@shared/types/types';
import { useTodoStore } from '@shared/model/useTodoStore';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import { CustomButton, CustomInput, MultiContainer, Typography } from '@shared/ui';
import { IconArrow, IconMoon, IconSun } from '@shared/assets/icons';

const options: Filter[] = ['All', 'New', 'In progress', 'Completed'];

export const Header: FC<THeaderProps> = ({ theme, setTheme }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const { filter, setFilter, setSearch } = useTodoStore();

  useOutsideClick(dropdownRef, () => setIsOpenDropdown(false));

  const handleOptionClick = (option: Filter) => {
    setFilter(option);
    setIsOpenDropdown(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };

  return (
    <MultiContainer>
      <div className={styles.header}>
        <Typography variant='h1' color='textColor' className={styles.title}>
          Todo List
        </Typography>

        <div className={styles.controls}>
          <div className={styles.search}>
            <CustomInput
              type='text'
              placeholder='Search note...'
              iconSearch={true}
              onChangeText={handleSearchChange}
            />
          </div>
          <div className={styles.select} ref={dropdownRef}>
            <CustomButton
              variant='primary'
              onClick={() => setIsOpenDropdown((prev) => !prev)}
              className={styles.btn}
              isTextBtn={false}
            >
              <Typography variant='smallBodyText' color='white'>
                {filter}
              </Typography>
              <IconArrow
                width={14}
                height={14}
                className={classNames(
                  { [styles.iconIsOpened]: isOpenDropdown },
                  { [styles.iconIsClosed]: !isOpenDropdown }
                )}
              />
            </CustomButton>
            {isOpenDropdown && (
              <div className={classNames(styles.dropdown)}>
                {options.map((option) => (
                  <div
                    key={option}
                    className={classNames(styles.option, {
                      [styles.active]: filter === option,
                    })}
                    onClick={() => handleOptionClick(option)}
                  >
                    <Typography
                      variant='smallBodyText'
                      TIsUpper={false}
                      color='purple'
                    >
                      {option}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
          <CustomButton
            variant='primary'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            isTextBtn={false}
            className={styles.themeBtn}
          >
            {theme === 'light' ? <IconMoon /> : <IconSun />}
          </CustomButton>
        </div>
      </div>
    </MultiContainer>
  );
};
