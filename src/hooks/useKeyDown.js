import { useEffect } from 'react';

export function useKeyDown(handler, ref) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== 'Escape') return;

      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.addEventListener('keydown', handleKeyDown, true);
  }, [handler, ref]);

  return ref;
}
