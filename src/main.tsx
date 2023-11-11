import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '~/components/root/App';
import { StrictMode } from 'react';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
