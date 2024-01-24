import type {
  Item,
  ItemFeature,
  DbItemFeatures,
  CategoryId,
  ItemOptionId,
  ApplicationId,
  ManufacturerId,
} from '~/types';
import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { checkSearchKeyword } from '~/helpers';

export const matchItemWithSearchKeyword = (
  item: Item,
  searchKeyword: string,
  applicationIds: ApplicationId[],
  manufacturerIds: ManufacturerId[],
): boolean => {
  let itemIsMatched = checkSearchKeyword(item.title, searchKeyword);

  itemIsMatched ||= !itemIsMatched && checkSearchKeyword(item.subtitle, searchKeyword);

  if (!itemIsMatched && item.content) {
    itemIsMatched ||= checkSearchKeyword(item.content, searchKeyword);
  }

  if (!itemIsMatched && item.seo) {
    itemIsMatched ||= checkSearchKeyword(item.seo.description, searchKeyword);

    itemIsMatched ||= item.seo.keywords.split(',').some(seoKeyword =>
      seoKeyword
        .trim()
        .toLowerCase()
        .split('-')
        .some(seoKeywordPart => seoKeywordPart.startsWith(searchKeyword)),
    );
  }

  if (!itemIsMatched && item.externalLinks) {
    itemIsMatched ||= item.externalLinks.some(externalLink =>
      checkSearchKeyword(externalLink.name, searchKeyword),
    );
  }

  if (!itemIsMatched && item.options) {
    itemIsMatched ||= Object.values(item.options).some(option =>
      checkSearchKeyword(option.name, searchKeyword),
    );
  }

  if (!itemIsMatched && item.contributors) {
    itemIsMatched ||= item.contributors.some(contributor =>
      checkSearchKeyword(contributor.name, searchKeyword),
    );
  }

  if (!itemIsMatched && applicationIds.length && item.applicationIds) {
    itemIsMatched ||= item.applicationIds.some(itemApplicationId =>
      applicationIds.includes(itemApplicationId),
    );
  }

  if (!itemIsMatched && manufacturerIds.length && item.manufacturerId) {
    itemIsMatched ||= manufacturerIds.includes(item.manufacturerId);
  }

  return itemIsMatched;
};

export const matchItemWithSearchKeywords = (
  item: Item,
  searchKeywords: string[],
  applicationIds: ApplicationId[],
  manufacturerIds: ManufacturerId[],
): boolean =>
  searchKeywords.every(searchKeyword =>
    matchItemWithSearchKeyword(item, searchKeyword, applicationIds, manufacturerIds),
  );

export const matchItemWithSearch = (
  item: Item,
  {
    searchKeywords,
    categoryId,
    applicationIds,
    manufacturerIds,
  }: {
    searchKeywords: string[];
    categoryId: CategoryId;
    applicationIds: ApplicationId[];
    manufacturerIds: ManufacturerId[];
  },
): boolean => {
  // show all items by default if nothing was passed
  let itemIsMatched = true;

  if (searchKeywords && searchKeywords.length) {
    itemIsMatched &&= matchItemWithSearchKeywords(
      item,
      searchKeywords,
      applicationIds,
      manufacturerIds,
    );
  }
  if (itemIsMatched && categoryId) {
    itemIsMatched &&= item.categoryId === categoryId;
  }
  return itemIsMatched;
};

export const getItemDefaultOption = (item: Item) =>
  item.options && Object.keys(item.options).find(optionId => item.options[optionId].default);

export const getItemPrice = (item: Item, optionId: ItemOptionId) => {
  if (!item.price) {
    return;
  }
  if (typeof item.price === 'number') {
    return item.price;
  }
  const priceConfig = item.price[optionId];

  return typeof priceConfig === 'number' ? priceConfig : priceConfig.price;
};

export const getItemPriceId = (item: Item, optionId: ItemOptionId) => {
  if (item.stripePriceId) {
    return item.stripePriceId;
  }
  const priceConfig = item.price[optionId];

  return typeof priceConfig === 'number' ? priceConfig : priceConfig.stripePriceId;
};

export const getItemAvailability = (item: Item, optionId: ItemOptionId) => {
  if (!item.availability) {
    return 0;
  }

  return typeof item.availability === 'number' ? item.availability : item.availability[optionId];
};

export const getItemWeight = (item: Item, optionId: ItemOptionId) => {
  if (!item.weight) {
    return 0;
  }

  return typeof item.weight === 'number' ? item.weight : item.weight[optionId];
};

export const getItemAvailabilitySEOSchema = (item: Item, optionId: ItemOptionId) => {
  const availability = getItemAvailability(item, optionId);

  if (availability) {
    return `${SEO_SCHEMA_BASE_URL}/InStock`;
  }
  if (availability === 0) {
    return `${SEO_SCHEMA_BASE_URL}/SoldOut`;
  }
  return `${SEO_SCHEMA_BASE_URL}/OutOfStock`;
};

export const sortItemFeatures = (allFeatures: DbItemFeatures, features: ItemFeature[]) =>
  [...features].sort((featureA, featureB) => {
    const featSecRefIdA = allFeatures[featureA.refId].featSecRefId;
    const featSecRefIdB = allFeatures[featureB.refId].featSecRefId;

    if (!featSecRefIdA) {
      return -1;
    }
    if (!featSecRefIdB) {
      return 1;
    }
    return featSecRefIdA - featSecRefIdB;
  });

export const getItemRatingIconName = (item: Item, iconNumber: number) => {
  const diff = item.rating - (iconNumber + 1);
  return diff >= 0 ? 'star' : diff >= -0.5 ? 'starHalf' : 'starBorder';
};
