import { useLayoutEffect } from 'react';

export const useBodyClass = (toggle: boolean, className: string) => {
  useLayoutEffect(() => {
    if (toggle) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [className, toggle]);
};
