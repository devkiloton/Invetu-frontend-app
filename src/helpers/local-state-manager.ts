export const localStateManager = {
  theme: {
    get: (): 'DARK' | 'LIGHT' =>
      (localStorage.getItem('theme') as 'DARK' | 'LIGHT') ?? 'LIGHT',
    set: (value: 'LIGHT' | 'DARK') => localStorage.setItem('theme', value),
  },
};
