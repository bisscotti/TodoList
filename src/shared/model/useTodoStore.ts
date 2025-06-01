import type { TActions, TState, TTodo } from '@shared/types/types';
import { create } from 'zustand';

const initialTodos: TTodo[] = JSON.parse(
  localStorage.getItem('todos') || '[]'
).map((todo: TTodo) => ({
  ...todo,
  deadline: todo.deadline ? new Date(todo.deadline) : undefined,
}));

export const useTodoStore = create<TState & TActions>((set, get) => ({
  todos: initialTodos,
  selectedTodo: null,
  search: '',
  filter: (localStorage.getItem('filter') as TState['filter']),
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
  getFilteredTodos: () => {
    const { todos, search, filter } = get();
    const now = Date.now();

    return todos
      .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
      .filter((todo) => {
        if (filter === 'All') return true;
        if (filter === 'New') return now - todo.createdAt <= 5 * 60_000;
        if (filter === 'Completed') return todo.completed;
        if (filter === 'In progress') return !todo.completed;
        return true;
      });
  },
}));

useTodoStore.subscribe((state) => {
  localStorage.setItem('todos', JSON.stringify(state.todos));
  localStorage.setItem('filter', state.filter);
});


