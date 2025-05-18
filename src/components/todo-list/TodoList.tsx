import { useState, type FC } from 'react';
import styles from './TodoList.module.scss';
import { NoteItem } from '../note-item/NoteItem';
import { CustomButton } from '../../ui/custom-button/CustomButton';
import { IconAdd, IconDetective } from '../../assets/icons';
import { toast } from 'react-toastify';
import { Modal } from '../../ui/modal/Modal';
import { useTodoStore } from '../../model/useTodoStore';
import { MultiContainer } from '../../ui/multi-container/MultiContainer';
import { Typography } from '../../ui/typography/Typography';
import type { Status, TTodo } from '../../model/types';

export const TodoList: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<Status>('In progress');
  const {
    todos,
    selectedTodo,
    setSelectedTodo,
    removeTodo,
    search,
    filter,
    addTodo,
    editTodo,
    setStatus: setStatusInStore,
  } = useTodoStore();

  const handleApply = () => {
    if (!title.trim() || !deadline) {
      toast.error('Input title, description and deadline with date and time');
      return;
    }

    if (isEditMode && selectedTodo) {
      editTodo(selectedTodo.id, title, desc, status === 'Completed', deadline);
      setIsEditMode(false);
      toast.success('Todo is updated!');
    } else {
      addTodo(title, desc, deadline);
      toast.success('Todo is added!');
    }

    setTitle('');
    setDesc('');
    setDeadline(undefined);
    setStatus('In progress');
    setIsEditMode(false);
    setSelectedTodo(null);
    setIsOpenModal(false);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsEditMode(false);
    setSelectedTodo(null);
    setTitle('');
    setDesc('');
    setDeadline(undefined);
    setStatus('In progress');
  };

  const handleOpenEditModal = (todo: TTodo) => {
    setTitle(todo.title);
    setDesc(todo.description || '');
    setDeadline(todo.deadline);
    setStatus(todo.completed ? 'Completed' : 'In progress');
    setIsEditMode(true);
    setSelectedTodo(todo);
    setIsOpenModal(true);
  };

  const now = Date.now();
  const filteredTodos = todos
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (filter === 'All') return true;
      if (filter === 'New') return now - todo.createdAt <= 5 * 60_000;
      if (filter === 'Completed') return todo.completed;
      if (filter === 'In progress') return !todo.completed;
      return true;
    });

  return (
    <MultiContainer>
      <div className={styles.content}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
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
