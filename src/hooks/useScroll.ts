import React from 'react';

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
