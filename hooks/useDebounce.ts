import { useEffect, useState } from 'react';

// The user see on the search the value that he is typing, but the search is only triggered after 500ms
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
