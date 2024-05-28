import {useEffect, useState} from "react";

// Copied from useHooks package: https://github.com/uidotdev/usehooks/blob/main/index.js#L232
export function useDebouncedValue<T>(value: T, ms = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [value, ms]);

  return debouncedValue;
}
