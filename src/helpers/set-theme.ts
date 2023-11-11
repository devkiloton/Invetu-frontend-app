import { localStateManager } from './local-state-manager';

export const setTheme = (theme: 'LIGHT' | 'DARK') => {
  switch (theme) {
    case 'LIGHT':
      document.querySelector('html')?.setAttribute('data-theme', 'cmyk');
      localStateManager.theme.set('LIGHT');
      break;
    default:
      document.querySelector('html')?.setAttribute('data-theme', 'dracula');
      localStateManager.theme.set('DARK');
      break;
  }
};
