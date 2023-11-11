import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '~/components/root/App';
import { StrictMode } from 'react';
import { localStateManager } from './helpers/local-state-manager';
import { setTheme } from './helpers/set-theme';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
const theme = localStateManager.theme.get();
setTheme(theme);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
