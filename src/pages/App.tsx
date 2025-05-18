import { useEffect, useState, type FC } from 'react';
import { Header } from '../components/header/Header';
import { TodoList } from '../components/todo-list/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <div className={`app ${theme}`}>

      <Header theme={theme} setTheme={setTheme} />
      <TodoList/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
