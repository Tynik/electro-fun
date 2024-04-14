import type {
  ApplicationId,
  DatasheetId,
  ProductId,
  ProductOptionId,
  FeatureId,
  CategoryId,
  ManufacturerId,
  BrandId,
  StripePriceId,
  StripeProductId,
} from './ids.types';
import type { Seo } from '.';

export enum ProductFeatureValueType {
  axis,
  range,
}

export type ProductSeo = Seo & {
  title?: string;
  measurement?: string;
};

type ProductFeaturePrimitiveValue = string | number | (string | number)[];

type ProductFeatureMultiValue = {
  value: ProductFeaturePrimitiveValue;
  type?: ProductFeatureValueType;
  info?: string;
  icon?: string;
};

export type ProductFeatureValue = ProductFeaturePrimitiveValue | ProductFeatureMultiValue[];

export type ProductFeature = {
  refId: FeatureId;
  value: ProductFeatureValue;
  info?: string | string[];
  optionId?: string;
};

export type ProductImage = {
  alt: string;
  src: string;
  description?: string;
  optionId?: string;
};

type GithubProductContributorSrc = {
  source: 'github';
  userId: number;
};

type YoutubeProductContributorSrc = {
  source: 'youtube';
  avatarSrc: string;
};

export type ProductContributorSrc = GithubProductContributorSrc | YoutubeProductContributorSrc;

export type ProductContributor = {
  name: string;
  url: string;
  src?: ProductContributorSrc;
};

type ProductCodeExampleLib = {
  name: string;
  url: string;
};

type ProductCodeExample = {
  name: string;
  code: string;
  libs?: ProductCodeExampleLib[];
};

export type ProductExternalLink = {
  name: string;
  url: string;
  lang: string;
  icon?: string;
  iconAlt?: string;
};

type ProductOption = {
  name: string;
  default?: boolean;
};

export type ProductOptions = Record<ProductOptionId, ProductOption>;

export type ProductPeculiarity = string;

export type ProductAccessory = {
  name: string;
  count: number;
};

type ProductPriceConfig = {
  stripePriceId: StripePriceId;
};

export type GTIN = string;

export type MPN = string;

export type Product = {
  id: ProductId;
  title: string;
  subtitle: string;
  stripeProductId?: StripeProductId;
  categoryId?: CategoryId;
  googleCategoryId?: number;
  seo?: ProductSeo;
  brandId?: BrandId;
  gtin?: GTIN;
  mpn?: MPN;
  manufacturerId?: ManufacturerId;
  companyUrl?: string;
  original?: boolean;
  content?: string;
  warningContent?: string;
  datasheetId?: DatasheetId;
  relatedDatasheetIds?: DatasheetId[];
  weight?: number | Record<ProductOptionId, number>;
  price?: Record<ProductOptionId, ProductPriceConfig>;
  stripePriceId?: StripePriceId;
  rating?: number;
  // link where is to buy or true/false
  buy?: string | boolean;
  options?: ProductOptions;
  features?: ProductFeature[];
  images: ProductImage[];
  peculiarities?: ProductPeculiarity[];
  applicationIds?: ApplicationId[];
  accessories?: ProductAccessory[];
  contributors?: ProductContributor[];
  externalLinks?: ProductExternalLink[];
  codeExamples?: ProductCodeExample[];
};
