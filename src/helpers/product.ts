import type {
  Product,
  ProductFeature,
  DbProductFeatures,
  CategoryId,
  ProductOptionId,
  ApplicationId,
  ManufacturerId,
  Nullable,
} from '~/types';
import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { checkSearchKeyword } from '~/helpers';
import type { StripeProduct } from '~/api';

export const matchProductWithSearchKeyword = (
  product: Product,
  searchKeyword: string,
  applicationIds: ApplicationId[],
  manufacturerIds: ManufacturerId[],
): boolean => {
  let isProductMatched = checkSearchKeyword(product.title, searchKeyword);

  isProductMatched ||= !isProductMatched && checkSearchKeyword(product.subtitle, searchKeyword);

  if (!isProductMatched && product.content) {
    isProductMatched ||= checkSearchKeyword(product.content, searchKeyword);
  }

  if (!isProductMatched && product.seo) {
    isProductMatched ||= checkSearchKeyword(product.seo.description, searchKeyword);

    isProductMatched ||= product.seo.keywords.split(',').some(seoKeyword =>
      seoKeyword
        .trim()
        .toLowerCase()
        .split('-')
        .some(seoKeywordPart => seoKeywordPart.startsWith(searchKeyword)),
    );
  }

  if (!isProductMatched && product.externalLinks) {
    isProductMatched ||= product.externalLinks.some(externalLink =>
      checkSearchKeyword(externalLink.name, searchKeyword),
    );
  }

  if (!isProductMatched && product.options) {
    isProductMatched ||= Object.values(product.options).some(option =>
      checkSearchKeyword(option.name, searchKeyword),
    );
  }

  if (!isProductMatched && product.contributors) {
    isProductMatched ||= product.contributors.some(contributor =>
      checkSearchKeyword(contributor.name, searchKeyword),
    );
  }

  if (!isProductMatched && applicationIds.length && product.applicationIds) {
    isProductMatched ||= product.applicationIds.some(productApplicationId =>
      applicationIds.includes(productApplicationId),
    );
  }

  if (!isProductMatched && manufacturerIds.length && product.manufacturerId) {
    isProductMatched ||= manufacturerIds.includes(product.manufacturerId);
  }

  return isProductMatched;
};

export const matchProductWithSearchKeywords = (
  product: Product,
  searchKeywords: string[],
  applicationIds: ApplicationId[],
  manufacturerIds: ManufacturerId[],
): boolean =>
  searchKeywords.every(searchKeyword =>
    matchProductWithSearchKeyword(product, searchKeyword, applicationIds, manufacturerIds),
  );

export const matchProductWithSearch = (
  product: Product,
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
  let isProductMatched = true;

  if (searchKeywords && searchKeywords.length) {
    isProductMatched &&= matchProductWithSearchKeywords(
      product,
      searchKeywords,
      applicationIds,
      manufacturerIds,
    );
  }
  if (isProductMatched && categoryId) {
    isProductMatched &&= product.categoryId === categoryId;
  }
  return isProductMatched;
};

export const getProductDefaultOption = (product: Product) => {
  const productOptions = product.options;

  if (!productOptions) {
    return null;
  }

  return Object.keys(productOptions).find(optionId => productOptions[optionId]?.default);
};

export const getProductStripePriceId = (product: Product, optionId: Nullable<ProductOptionId>) => {
  if (product.stripePriceId) {
    return product.stripePriceId;
  }

  if (!optionId || product.price === undefined) {
    return undefined;
  }

  return product.price[optionId].stripePriceId;
};

export const getProductPrice = (
  stripeProduct: StripeProduct | undefined,
  product: Product,
  optionId: ProductOptionId,
) => {
  if (stripeProduct) {
    const productStripePriceId = getProductStripePriceId(product, optionId);

    if (productStripePriceId) {
      const productPrice = stripeProduct.prices[productStripePriceId];

      if (productPrice) {
        return productPrice.amount;
      }
    }
  }

  return 0;
};

export const getProductAllowedQuantity = (
  stripeProduct: StripeProduct | undefined,
  product: Product,
  optionId: Nullable<ProductOptionId>,
) => {
  if (stripeProduct) {
    const productStripePriceId = getProductStripePriceId(product, optionId);

    if (productStripePriceId) {
      const productPrice = stripeProduct.prices[productStripePriceId];

      if (productPrice) {
        return productPrice.quantity;
      }
    }
  }

  return 0;
};

export const getProductWeight = (product: Product, optionId: ProductOptionId) => {
  if (!product.weight) {
    return 0;
  }

  return typeof product.weight === 'number' ? product.weight : product.weight[optionId];
};

export const getProductAvailabilitySeoSchema = (
  stripeProduct: StripeProduct | undefined,
  product: Product,
  optionId: ProductOptionId,
) => {
  const quantity = getProductAllowedQuantity(stripeProduct, product, optionId);

  if (quantity) {
    return `${SEO_SCHEMA_BASE_URL}/InStock`;
  }

  if (quantity === 0) {
    return `${SEO_SCHEMA_BASE_URL}/SoldOut`;
  }

  return `${SEO_SCHEMA_BASE_URL}/OutOfStock`;
};

export const sortProductFeatures = (allFeatures: DbProductFeatures, features: ProductFeature[]) =>
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

export const getProductRatingIconName = (product: Product, iconNumber: number) => {
  const diff = (product.rating ?? 5) - (iconNumber + 1);

  return diff >= 0 ? 'star' : diff >= -0.5 ? 'starHalf' : 'starBorder';
};