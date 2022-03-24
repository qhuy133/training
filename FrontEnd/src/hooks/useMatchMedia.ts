import { useState, useEffect } from 'react';

// pass a query like `(min-width: 768px)`
export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = matchMedia(query);
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      });
      return () =>
        mediaQueryList.removeEventListener('change', (event: MediaQueryListEvent) => {
          setMatches(event.matches);
        });
    } else {
      mediaQueryList.onchange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      return () => (mediaQueryList.onchange = null);
    }
  }, [query]);

  return matches;
}
