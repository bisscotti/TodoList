export type Status = 'In progress' | 'Completed';
export type Filter = 'All' | 'New' | Status;

export type TTodo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  deadline?: Date;
};

export type TState = {
  todos: TTodo[];
  selectedTodo: TTodo | null;
  search: string;
  filter: Filter;
  getFilteredTodos: () => TTodo[];
};

export type TActions = {
  addTodo: (title: string, description: string, deadline?: Date) => void;
  removeTodo: (id: string) => void;
  editTodo: (
    id: string,
    title: string,
    description: string,
    completed: boolean,
    deadline?: Date
  ) => void;
  setStatus: (id: string, completed: boolean) => void;
  setSelectedTodo: (todo: TTodo | null) => void;
  setSearch: (value: string) => void;
  setFilter: (filter: Filter) => void;
};
