import React from 'react';

export const useLocalStorage = (
  key: string,
  dataType: string,
  defaultValue: any = null
) => {
  const get = React.useCallback((): boolean => {
    const value = window.localStorage.getItem(key);

    if (dataType === 'boolean') {
      return value ? Boolean(Number(value)) : defaultValue || false;
    }
    throw new Error('Value cannot be unconverted');
  }, []);

  const set = React.useCallback((value: boolean) => {
    let convertedValue;

    if (dataType === 'boolean') {
      convertedValue = String(Number(value));
    } else {
      throw new Error('Datatype it not supported');
    }
    window.localStorage.setItem(key, convertedValue);
  }, []);

  const initialValue = React.useMemo<boolean>(() => {
    return get();
  }, []);

  return {
    get,
    set,
    initialValue
  };
};
