import React from 'react';

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
