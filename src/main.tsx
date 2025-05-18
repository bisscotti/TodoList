import { createRoot } from 'react-dom/client';
import { App } from './pages/App.tsx';
import './style/global.scss';


createRoot(document.getElementById('root')!).render(<App />);
