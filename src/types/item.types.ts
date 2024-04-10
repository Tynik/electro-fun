import type {
  ApplicationId,
  DatasheetId,
  ItemId,
  ItemOptionId,
  FeatureId,
  CategoryId,
  ManufacturerId,
  BrandId,
  StripePriceId,
  StripeProductId,
} from './ids.types';
import type { Seo } from '.';

export enum ItemFeatureValueType {
  axis,
  range,
}

export type ItemSeo = Seo & {
  title?: string;
  measurement?: string;
};

export type ItemFeatureMultiValue =
  | string
  | {
      value: string | string[];
      type?: ItemFeatureValueType;
      info?: string;
    };

export type ItemFeature = {
  refId: FeatureId;
  value: string | ItemFeatureMultiValue[];
  info?: string | string[];
  optionId?: string;
};

export type ItemImage = {
  alt: string;
  src: string;
  description?: string;
  optionId?: string;
};

type GithubItemContributorSrc = {
  source: 'github';
  userId: number;
};

type YoutubeItemContributorSrc = {
  source: 'youtube';
  avatarSrc: string;
};

export type ItemContributorSrc = GithubItemContributorSrc | YoutubeItemContributorSrc;

export type ItemContributor = {
  name: string;
  url: string;
  src?: ItemContributorSrc;
};

type ItemCodeExampleLib = {
  name: string;
  url: string;
};

type ItemCodeExample = {
  name: string;
  code: string;
  libs?: ItemCodeExampleLib[];
};

export type ItemExternalLink = {
  name: string;
  url: string;
  lang: string;
  icon?: string;
  iconAlt?: string;
};

type ItemOption = {
  name: string;
  default?: boolean;
};

export type ItemOptions = Record<ItemOptionId, ItemOption>;

export type ItemPeculiarity = string;

export type ItemAccessory = {
  name: string;
  count: number;
};

type PriceConfig = {
  price: number;
  stripePriceId?: StripePriceId;
};

export type GTIN = string;

export type MPN = string;

export type Item = {
  title: string;
  subtitle: string;
  id?: ItemId;
  stripeProductId?: StripeProductId;
  categoryId?: CategoryId;
  googleCategoryId?: number;
  seo?: ItemSeo;
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
  quantity?: number | Record<ItemOptionId, number>;
  weight?: number | Record<ItemOptionId, number>;
  price?: number | Record<ItemOptionId, number | PriceConfig>;
  stripePriceId?: StripePriceId;
  rating?: number;
  // link where is to buy or true/false
  buy?: string | boolean;
  options?: ItemOptions;
  features?: ItemFeature[];
  images?: ItemImage[];
  peculiarities?: ItemPeculiarity[];
  applicationIds?: ApplicationId[];
  accessories?: ItemAccessory[];
  contributors?: ItemContributor[];
  externalLinks?: ItemExternalLink[];
  codeExamples?: ItemCodeExample[];
};

export type Items = Item[];
