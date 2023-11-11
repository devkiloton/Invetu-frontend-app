import { localStateManager } from './local-state-manager';

export const changeTheme = () => {
  const html = document.querySelector('html');
  const theme = html?.getAttribute('data-theme');
  const themeState = theme === 'dracula' ? 'DARK' : 'LIGHT';

  switch (themeState) {
    case 'LIGHT':
      document.querySelector('html')?.setAttribute('data-theme', 'dracula');
      localStateManager.theme.set('DARK');
      break;
    default:
      document.querySelector('html')?.setAttribute('data-theme', 'cmyk');
      localStateManager.theme.set('LIGHT');
      break;
  }
};
