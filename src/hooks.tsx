import React from 'react';
import { Container, Alert, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Db, DbMeta, Item } from './types';
import { preprocessDb, mergeDeep } from './utils';
import { fetchDbMeta, fetchDbPart } from './db-api';

export const wordsWrapper = (
  words: Record<string, string>,
  text: string,
  wrapper: (text: string, word: string, index: number) => any
): (string | JSX.Element)[] => {

  const wrap = (words: string[], text: string) => {
    let textParts, word;

    while (1) {
      if (!words.length) {
        return text;
      }
      word = words.pop();

      textParts = text.split(word);
      if (textParts.length > 1) {
        break;
      }
    }

    return textParts.reduce((result, textPart, index) => {
      if (textPart) {
        const leftAbbreviations = words.filter(a => a !== word);

        result.push(wrap(leftAbbreviations, textPart));
      }
      if (index !== textParts.length - 1) {
        result.push(wrapper(text, word, index));
      }
      return result;
    }, []);
  };

  return wrap(Object.keys(words), text);
};

export const useTextProcessor = () => {
  return {
    wordsWrapper
  };
};

export const useScroll = (options: ScrollToOptions, delay = 100) => {
  React.useEffect(() => {
    setTimeout(() => {
      window.scroll(options);
    }, delay);
  }, []);
};

export const useSmoothScroll = (
  options: Omit<ScrollToOptions, 'behavior'>,
  delay = 100
) => {
  useScroll({
    ...options,
    behavior: 'smooth'
  }, delay);
};

export const useStaticErrors = ({ showReturnToMain } = { showReturnToMain: true }) => {
  const [errors, setErrors] = React.useState<string[]>([]);

  const printErrors = () => {
    return (
      <Container sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Alert severity={'error'}>
          {errors.map(error => <div key={error}>{error}</div>)}
        </Alert>
        {showReturnToMain && (
          <Link to={'/'} component={RouterLink}>Вернуться на главную</Link>
        )}
      </Container>
    );
  };

  return {
    errors,
    setErrors,
    printErrors
  };
};

export type useDbOptions = {
  partNumber: number
}

export const useDb = (options: useDbOptions = { partNumber: 1 }) => {
  const [dbMeta, setDbMeta] = React.useState<DbMeta>(null);
  const [db, setDb] = React.useState<Db>(null);
  const [dbPartNumber, setDbPartNumber] = React.useState<number>(options.partNumber);
  const [dbParts, setDbParts] = React.useState<Record<string, Db>>({});

  const { errors, setErrors, printErrors } = useStaticErrors({ showReturnToMain: false });

  React.useEffect(() => {
    (
      async () => {
        await loadDbMeta();
      }
    )();
  }, []);

  React.useEffect(() => {
    (
      async () => {
        if (!dbMeta) {
          return;
        }
        if (dbParts[dbPartNumber]) {
          // cache db part mechanism
          return;
        }
        await loadDbPart(dbPartNumber);
      }
    )();
  }, [dbMeta, dbPartNumber]);

  React.useEffect(() => {
    if (!Object.keys(dbParts).length) {
      return;
    }
    setDb(mergeDeep({}, ...Object.values(dbParts)));

  }, [dbParts]);

  const loadDbMeta = async () => {
    try {
      setDbMeta(await fetchDbMeta());
    } catch (e) {
      setErrors(['Error loading meta db']);
      throw e;
    }
  };

  const loadDbPart = async (partNumber: number) => {
    try {
      const dbPart = await fetchDbPart(partNumber);

      setDbParts(dbParts => (
        { ...dbParts, [partNumber]: preprocessDb(dbPart) }
      ));
    } catch (e) {
      setErrors(['Error loading db']);
      throw e;
    }
  };

  const loadPreviousDbPart = (): boolean => {
    if (dbPartNumber > 1) {
      setDbPartNumber(dbPartNumber - 1);
      return true;
    }
    return false;
  };

  const isNextDbPart = (): boolean => {
    return dbPartNumber < dbMeta.parts;
  };

  const loadNextDbPart = (): boolean => {
    if (isNextDbPart()) {
      setDbPartNumber(dbPartNumber + 1);
      return true;
    }
    return false;
  };

  return {
    db,
    loadDbPart: setDbPartNumber,
    loadPreviousDbPart,
    isNextDbPart,
    loadNextDbPart,
    errors,
    printErrors
  };
};

export const useDbSearch = (db: Db, loadNextDbPart: () => boolean) => {
  const [searchText, setSearchText] = React.useState<string>(null);
  const [categoryId, setCategoryId] = React.useState<number>(null);
  const [foundItems, setFoundItems] = React.useState<Item[]>(null);

  React.useEffect(() => {
    if ((
      searchText === null && categoryId === null
    ) || !db) {
      return;
    }
    if (searchText === '' && categoryId === null) {
      setFoundItems(null);
      return;
    }
    const foundItems = db.items.filter((item) => {
      let r = true;
      if (searchText) {
        r &&= item.title.toLowerCase().includes(searchText) ||
          item.subtitle.toLowerCase().includes(searchText) ||
          item.content.toLowerCase().includes(searchText);
      }
      if (categoryId) {
        r &&= item.categoryId === categoryId;
      }
      return r;
    });
    setFoundItems(foundItems);

    loadNextDbPart();
  }, [db, searchText, categoryId]);

  const search = ({ text, categoryId }: { text?: string, categoryId?: number }) => {
    if (text !== undefined) {
      setSearchText(text.toLowerCase());
    }
    if (categoryId !== undefined) {
      setCategoryId(categoryId);
    }
  };

  return {
    search,
    foundItems
  };
};
