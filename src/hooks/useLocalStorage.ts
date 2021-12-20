import React from 'react';

export const useLocalStorage = <T = any>(
  key: string,
  defaultValue: T = null
) => {
  const get = React.useCallback((): T => {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  }, []);

  const set = React.useCallback((value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const initialValue = React.useMemo(() => get(), []);

  return {
    get,
    set,
    initialValue
  };
};
