import { useTodoStore } from "./useTodoStore";

describe('Todo Store', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({
      todos: [],
      selectedTodo: null,
      search: '',
      filter: 'All',
    });
  });

  it('добавляет новую задачу', () => {
    const title = 'Новая задача';
    const description = 'Описание задачи';
    const deadline = new Date();

    useTodoStore.getState().addTodo(title, description, deadline);

    const todos = useTodoStore.getState().todos;

    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe(title);
    expect(todos[0].description).toBe(description);
    expect(todos[0].completed).toBe(false);
    expect(todos[0].deadline).toEqual(new Date(deadline));
  });

  it('сохраняет задачу в localStorage', () => {
    const title = 'Локальная задача';
    const description = 'Сохранение в localStorage';

    useTodoStore.getState().addTodo(title, description);

    const saved = JSON.parse(localStorage.getItem('todos') || '[]');
    expect(saved.length).toBe(1);
    expect(saved[0].title).toBe(title);
  });
});