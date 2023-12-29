import { useCallback } from 'react';

function useSnackbar() {
  return useCallback((message: string) => {
    // Append the tooltip to the body with the message
    const tooltip = `<div class="bg-primary h-16 rounded-md flex items-center p-4 fixed bottom-3 z-50 left-[50%] translate-x-[-50%] font-medium text-primary-content">${message}</div>`;
    document.body.insertAdjacentHTML('beforeend', tooltip);
    // Remove the tooltip after 3 seconds
    setTimeout(() => {
      document.body.removeChild(document.body.lastChild!);
    }, 3000);
  }, []);
}
export default useSnackbar;
