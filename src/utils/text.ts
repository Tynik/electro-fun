import type { ReactElement } from 'react';

type Wrapper = (text: string, word: string | null, index: number | null) => any;

export const wordsWrapper = (
  words: string[],
  text: string,
  wrapper: Wrapper,
): (string | ReactElement)[] => {
  const wrap = (words: string[], text: string) => {
    let textParts: string[] = [];
    let word: string | undefined;

    while (1) {
      if (!words.length) {
        return wrapper(text, null, null);
      }
      word = words.pop();

      textParts = text.split(word ?? '');
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

  return wrap(words, text);
};
