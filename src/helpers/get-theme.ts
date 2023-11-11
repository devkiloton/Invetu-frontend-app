import { localStateManager } from './local-state-manager';

// function to get the them based in the `data-theme` attribute in the html tag
export const getTheme = () => localStateManager.theme.get();
