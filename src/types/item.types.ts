import type {
  ApplicationId,
  DatasheetId,
  ItemId,
  ItemOptionId,
  FeatureId,
  CategoryId,
  ManufacturerId,
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

export enum ItemContributorSrcSource {
  GITHUB = 'github',
}

export type ItemContributorSrc = {
  source: ItemContributorSrcSource;
  userId: number;
};

export type ItemContributor = {
  name: string;
  url: string;
  src?: ItemContributorSrc;
};

export type ItemCodeExampleLib = {
  name: string;
  url: string;
};

export type ItemCodeExample = {
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

export type ItemOption = {
  name: string;
  default?: boolean;
};

export type ItemOptions = Record<ItemOptionId, ItemOption>;

export type ItemPeculiarity = string;

export type ItemAccessory = {
  name: string;
  count: number;
};

type PriceId = string;

export type Item = {
  title: string;
  subtitle: string;
  lang: string;
  id?: ItemId;
  categoryId?: CategoryId;
  seo?: ItemSeo;
  manufacturerId?: ManufacturerId;
  companyLink?: string;
  original?: boolean;
  content?: string;
  warningContent?: string;
  datasheetId?: DatasheetId;
  relatedDatasheetIds?: DatasheetId[];
  availability?: number | Record<ItemOptionId, number>;
  price?: number | Record<ItemOptionId, number>;
  priceId?: PriceId;
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
