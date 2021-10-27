import { ItemT } from '../types';

export const matchItemKeyword = (item: ItemT, keyword: string): boolean => {
  let keywordMatch = item.title.toLowerCase().includes(keyword) ||
    item.subtitle.toLowerCase().includes(keyword);

  if (item.content) {
    keywordMatch ||= item.content.toLowerCase().includes(keyword);
  }

  if (item.seo) {
    keywordMatch ||= item.seo.description.toLowerCase().includes(keyword);
    keywordMatch ||= item.seo.keywords.split(',').some(seoKeyword =>
      seoKeyword.trim().toLowerCase().split('-').some(seoKeywordPart =>
        seoKeywordPart.startsWith(keyword)
      )
    );
  }

  if (item.externalLinks) {
    keywordMatch ||= item.externalLinks.some(externalLink =>
      externalLink.name.toLowerCase().includes(keyword)
    );
  }
  return keywordMatch;
};

export const matchItemKeywords = (item: ItemT, keywords: string[]): boolean =>
  keywords.every(keyword => matchItemKeyword(item, keyword))
