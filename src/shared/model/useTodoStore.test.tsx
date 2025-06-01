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

  it('редактирует существующую задачу', () => {
    useTodoStore.getState().addTodo('Задача', 'Описание', undefined);
    const todo = useTodoStore.getState().todos[0];

    useTodoStore.getState().editTodo(
      todo.id,
      'Обновлённая задача',
      'Новое описание',
      true,
      new Date('2025-01-01')
    );

    const updatedTodo = useTodoStore.getState().todos.find(t => t.id === todo.id);
    expect(updatedTodo).toBeDefined();
    expect(updatedTodo?.title).toBe('Обновлённая задача');
    expect(updatedTodo?.description).toBe('Новое описание');
    expect(updatedTodo?.completed).toBe(true);
    expect(updatedTodo?.deadline).toEqual(new Date('2025-01-01'));
  });

  it('удаляет задачу', () => {
    useTodoStore.getState().addTodo('Задача для удаления', 'Описание', undefined);
    const todo = useTodoStore.getState().todos[0];

    useTodoStore.getState().removeTodo(todo.id);

    const todos = useTodoStore.getState().todos;
    expect(todos.find(t => t.id === todo.id)).toBeUndefined();
  });

  it('фильтрует задачи по поисковому запросу', () => {
    useTodoStore.getState().addTodo('Первая задача', '', undefined);
    useTodoStore.getState().addTodo('Вторая задача', '', undefined);
    useTodoStore.setState({ search: 'первая' });

    const filtered = useTodoStore.getState().getFilteredTodos();

    expect(filtered.length).toBe(1);
    expect(filtered[0].title.toLowerCase()).toContain('первая');
  });
});