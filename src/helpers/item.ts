import { ItemT, CategoryIdT } from '../types';

export const matchItemWithSearchKeyword = (item: ItemT, searchKeyword: string): boolean => {
  let keywordIsMatched = item.title.toLowerCase().includes(searchKeyword);
  keywordIsMatched ||= item.subtitle.toLowerCase().includes(searchKeyword);

  if (item.developedBy) {
    keywordIsMatched ||= item.developedBy.toLowerCase().includes(searchKeyword);
  }

  if (item.content) {
    keywordIsMatched ||= item.content.toLowerCase().includes(searchKeyword);
  }

  if (item.seo) {
    keywordIsMatched ||= item.seo.description.toLowerCase().includes(searchKeyword);

    keywordIsMatched ||= item.seo.keywords.split(',').some(seoKeyword =>
      seoKeyword.trim().toLowerCase().split('-').some(seoKeywordPart =>
        seoKeywordPart.startsWith(searchKeyword)
      )
    );
  }

  if (item.externalLinks) {
    keywordIsMatched ||= item.externalLinks.some(externalLink =>
      externalLink.name.toLowerCase().includes(searchKeyword)
    );
  }
  return keywordIsMatched;
};

export const matchItemWithSearchKeywords = (item: ItemT, searchKeywords: string[]): boolean =>
  searchKeywords.every(searchKeyword =>
    matchItemWithSearchKeyword(item, searchKeyword)
  );

export const matchItemWithSearch = (
  item: ItemT,
  {
    searchKeywords,
    categoryId
  }: {
    searchKeywords: string[]
    categoryId: CategoryIdT
  }
): boolean => {
  // show all items by default if nothing was passed
  let itemIsMatched = true;

  if (searchKeywords && searchKeywords.length) {
    itemIsMatched &&= matchItemWithSearchKeywords(item, searchKeywords);
  }
  if (categoryId) {
    itemIsMatched &&= item.categoryId === categoryId;
  }
  return itemIsMatched;
};
