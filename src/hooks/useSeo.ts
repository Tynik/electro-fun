import React from 'react';
import type { Nullable } from '~/types';

export type UseSeoOptions = {
  title: string;
  description?: string;
  keywords?: string;
};

export const useSeo = (options: Nullable<UseSeoOptions>) => {
  React.useEffect(() => {
    if (options === null) {
      return;
    }
    let originalDocumentTitle, originalDescription, originalKeywords, meta;

    originalDocumentTitle = document.title;

    document.title = options.title;

    if (options.description && options.keywords) {
      setTimeout(() => {
        meta = document.getElementsByTagName('meta');
        originalDescription = meta['description'].content;
        originalKeywords = meta['keywords'].content;

        meta['description'].content = options.description;
        meta['keywords'].content = options.keywords;
      });
    }

    return () => {
      document.title = originalDocumentTitle;

      if (meta) {
        meta['description'].content = originalDescription;
        meta['keywords'].content = originalKeywords;
      }
    };
  }, [options]);
};
