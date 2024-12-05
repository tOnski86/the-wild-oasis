import { useEffect } from 'react';

export function useOutsideClick(handler, ref) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, [handler, ref]);

  return ref;
}
