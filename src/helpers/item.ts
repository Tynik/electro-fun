import type {
  ItemT,
  CategoryIdT,
  ItemOptionIdT,
  ApplicationIdT,
  ManufacturerIdT
} from '~/types';
import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { checkSearchKeyword } from '~/helpers';

export const matchItemWithSearchKeyword = (
  item: ItemT,
  searchKeyword: string,
  applicationIds: ApplicationIdT[],
  manufacturerIds: ManufacturerIdT[]
): boolean => {
  let itemIsMatched = checkSearchKeyword(item.title, searchKeyword);

  itemIsMatched ||= !itemIsMatched && checkSearchKeyword(item.subtitle, searchKeyword);

  if (!itemIsMatched && item.content) {
    itemIsMatched ||= checkSearchKeyword(item.content, searchKeyword);
  }

  if (!itemIsMatched && item.seo) {
    itemIsMatched ||= checkSearchKeyword(item.seo.description, searchKeyword);

    itemIsMatched ||= item.seo.keywords.split(',').some(seoKeyword =>
      seoKeyword.trim().toLowerCase().split('-').some(seoKeywordPart =>
        seoKeywordPart.startsWith(searchKeyword)
      )
    );
  }

  if (!itemIsMatched && item.externalLinks) {
    itemIsMatched ||= item.externalLinks.some(externalLink =>
      checkSearchKeyword(externalLink.name, searchKeyword)
    );
  }

  if (!itemIsMatched && item.options) {
    itemIsMatched ||= Object.values(item.options).some(option =>
      checkSearchKeyword(option.name, searchKeyword)
    );
  }

  if (!itemIsMatched && item.contributors) {
    itemIsMatched ||= item.contributors.some(contributor =>
      checkSearchKeyword(contributor.name, searchKeyword)
    );
  }

  if (!itemIsMatched && applicationIds.length && item.applicationIds) {
    itemIsMatched ||= item.applicationIds.some(itemApplicationId =>
      applicationIds.includes(itemApplicationId)
    );
  }

  if (!itemIsMatched && manufacturerIds.length && item.manufacturerId) {
    itemIsMatched ||= manufacturerIds.includes(item.manufacturerId);
  }

  return itemIsMatched;
};

export const matchItemWithSearchKeywords = (
  item: ItemT,
  searchKeywords: string[],
  applicationIds: ApplicationIdT[],
  manufacturerIds: ManufacturerIdT[]
): boolean =>
  searchKeywords.every(searchKeyword =>
    matchItemWithSearchKeyword(
      item, searchKeyword, applicationIds, manufacturerIds
    )
  );

export const matchItemWithSearch = (
  item: ItemT,
  {
    searchKeywords,
    categoryId,
    applicationIds,
    manufacturerIds
  }: {
    searchKeywords: string[]
    categoryId: CategoryIdT
    applicationIds: ApplicationIdT[],
    manufacturerIds: ManufacturerIdT[],
  }
): boolean => {
  // show all items by default if nothing was passed
  let itemIsMatched = true;

  if (searchKeywords && searchKeywords.length) {
    itemIsMatched &&= matchItemWithSearchKeywords(
      item,
      searchKeywords,
      applicationIds,
      manufacturerIds
    );
  }
  if (itemIsMatched && categoryId) {
    itemIsMatched &&= item.categoryId === categoryId;
  }
  return itemIsMatched;
};

export const getItemDefaultOption = (item: ItemT) =>
  item.options && Object.keys(item.options).find(optionId =>
    item.options[optionId].default
  );

export const getItemPrice = (item: ItemT, optionId: ItemOptionIdT) => {
  if (!item.price) {
    return;
  }
  if (typeof item.price === 'number') {
    return item.price;
  }
  optionId = optionId || getItemDefaultOption(item);

  return item.price[optionId];
};

export const getItemAvailabilitySEOSchema = (item: ItemT) => {
  if (item.availability) {
    return `${SEO_SCHEMA_BASE_URL}/InStock`;
  }
  if (item.availability === 0) {
    return `${SEO_SCHEMA_BASE_URL}/SoldOut`;
  }
  return `${SEO_SCHEMA_BASE_URL}/OutOfStock`;
};
