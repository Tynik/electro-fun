import React from 'react';

export const useLocalStorage = <T = unknown>(key: string, defaultValue: T = null) => {
  const get = React.useCallback((): T => {
    const rawValue = window.localStorage.getItem(key);

    return rawValue === null ? defaultValue : JSON.parse(rawValue);
  }, []);

  const set = React.useCallback((value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const initialValue = React.useMemo(() => get(), []);

  return {
    get,
    set,
    initialValue,
  };
};
