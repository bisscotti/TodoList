import { createRoot } from 'react-dom/client';
import './style/global.scss';
import { App } from '@pages/App';

createRoot(document.getElementById('root')!).render(<App />);
