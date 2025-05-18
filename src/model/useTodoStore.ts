import { create } from 'zustand';
import type { TActions, TState, TTodo } from './types';

const initialTodos: TTodo[] = JSON.parse(
  localStorage.getItem('todos') || '[]'
).map((todo: TTodo) => ({
  ...todo,
  deadline: todo.deadline ? new Date(todo.deadline) : undefined,
}));
export const useTodoStore = create<TState & TActions>((set) => ({
  todos: initialTodos,
  selectedTodo: null,
  search: '',
  filter: 'All',
  addTodo: (title, description, deadline) =>
    set((state) => ({
      todos: [
        {
          id: crypto.randomUUID(),
          title,
          description,
          completed: false,
          createdAt: Date.now(),
          deadline: deadline ? new Date(deadline) : undefined,
        },
        ...state.todos,
      ],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  editTodo: (id, title, description, completed, deadline) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title,
              description,
              completed,
              deadline: deadline ? new Date(deadline) : undefined,
            }
          : todo
      ),
    })),
  setStatus: (id, completed) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      ),
    })),
  setSelectedTodo: (todo) => set({ selectedTodo: todo }),
  setSearch: (value) => set({ search: value }),
  setFilter: (filter) => set({ filter }),
}));

useTodoStore.subscribe((state) => {
  localStorage.setItem('todos', JSON.stringify(state.todos));
});
