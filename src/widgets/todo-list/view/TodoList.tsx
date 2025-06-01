import { useState, type FC } from 'react';
import styles from './TodoList.module.scss';
import { toast } from 'react-toastify';
import type { TTodo } from '@shared/types/types';
import { useTodoStore } from '@shared/model/useTodoStore';
import { CustomButton, MultiContainer, Typography } from '@shared/ui';
import { NoteItem } from '@widgets/note-item';
import { IconAdd, IconDetective } from '@shared/assets/icons';
import { Modal } from '@features/modal';

export const TodoList: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const {
    filter,
    setFilter,
    selectedTodo,
    setSelectedTodo,
    removeTodo,
    addTodo,
    editTodo,
    setStatus: setStatusInStore,
    getFilteredTodos,
  } = useTodoStore();

  const resetFormState = () => {
    setTitle('');
    setDesc('');
    setDeadline(undefined);
    setFilter('In progress');
    setIsEditMode(false);
    setSelectedTodo(null);
    setIsOpenModal(false);
  };
  const handleApply = () => {
    if (isEditMode && selectedTodo) {
      editTodo(selectedTodo.id, title, desc, filter === 'Completed', deadline);
      setIsEditMode(false);
      toast.success('Todo is updated!');
    } else {
      addTodo(title, desc, deadline);
      toast.success('Todo is added!');
    }

    resetFormState();
  };
  const handleCloseModal = () => {
    resetFormState();
  };

  const handleOpenEditModal = (todo: TTodo) => {
    setTitle(todo.title);
    setDesc(todo.description || '');
    setDeadline(todo.deadline);
    setFilter(todo.completed ? 'Completed' : 'In progress');
    setIsEditMode(true);
    setSelectedTodo(todo);
    setIsOpenModal(true);
  };

  return (
    <MultiContainer>
      <div className={styles.content}>
        {getFilteredTodos().length > 0 ? (
          getFilteredTodos().map((todo) => (
            <NoteItem
              key={todo.id}
              text={todo.title}
              completed={todo.completed}
              deadline={todo.deadline}
              onStatusChange={(checked) => setStatusInStore(todo.id, checked)}
              onEdit={() => handleOpenEditModal(todo)}
              onDelete={() => {
                removeTodo(todo.id);
                toast.info('Todo is deleted');
              }}
            />
          ))
        ) : (
          <div className={styles.emptyContainer}>
            <div className={styles.imgContainer}>
              <IconDetective />
            </div>
            <Typography
              variant='h1'
              color='textColor'
              TIsUpper={false}
              className={styles.text}
            >
              Empty...
            </Typography>
          </div>
        )}
        {isOpenModal && (
          <Modal
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            title={isEditMode ? 'Edit Note' : 'New Note'}
            inputTitle={title}
            inputDesc={desc}
            setInputTitle={setTitle}
            setInputDesc={setDesc}
            onApply={handleApply}
            createdAt={selectedTodo?.createdAt}
            deadline={deadline}
            setDeadline={setDeadline}
          ></Modal>
        )}
      </div>
      <CustomButton
        variant='primary'
        isTextBtn={false}
        className={styles.addBtn}
        onClick={() => setIsOpenModal(true)}
      >
        <IconAdd />
      </CustomButton>
    </MultiContainer>
  );
};
