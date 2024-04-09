import type {
  ApplicationId,
  DatasheetId,
  DocId,
  FeatureSectionId,
  FeatureId,
  CategoryId,
  ManufacturerId,
  BrandId,
} from './ids.types';

import type { Item, ItemFeatureValueType } from './item.types';

export * from './ids.types';
export * from './item.types';
export * from './user.types';

export type Article = {};

export type Seo = {
  title: string;
  description: string;
  keywords: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  icon: string;
};

type Brand = {
  name: string;
};

export type Manufacturer = {
  name: string;
  url?: string;
  logo?: string;
};

export type Application = string;
export type Applications = Record<ApplicationId, Application>;

export type FeatureDefinitionSuffix = string | Record<ItemFeatureValueType, string>;

export enum FeatureTypeId {
  bool,
}

export type FeatureDefinition = {
  name: string;
  suffix?: FeatureDefinitionSuffix;
  categories?: CategoryId[];
  featSecRefId?: FeatureSectionId;
  type?: FeatureTypeId;
};

export type DbItemFeatures = Record<FeatureId, FeatureDefinition>;

export type AbbreviationName = string;

export type Abbreviations = Record<
  AbbreviationName,
  {
    url: string;
    lang: string;
  }
>;

export type ClarificationName = string;

export type Clarifications = Record<
  ClarificationName,
  {
    url: string;
    lang: string;
  }
>;

export type DbMeta = {
  parts: number;
};

export type Datasheet = {
  lang: string;
  manufacturerId?: ManufacturerId;
  relatedDatasheetIds?: DatasheetId[];
  version?: string;
  description?: string;
};

export type Datasheets = Record<DatasheetId, Datasheet>;

export type FoundDatasheet = Datasheet & {
  // when datasheets should be sorted
  priority?: number;
};

export type FoundDatasheets = Record<DatasheetId, FoundDatasheet>;

export type Doc = {
  name: string;
  url: string;
};

export type Docs = Record<DocId, Doc>;

export type MenuItemT = {
  name: string;
  url: string;
  icon: string;
};

export type Db = {
  siteName: string;
  siteURL: string;
  seo: Seo;
  abbreviations: Abbreviations;
  clarifications: Clarifications;
  menu: MenuItemT[];
  articles: Article[];
  categories: Category[];
  featureSections: Record<FeatureSectionId, string>;
  optionTypes: Record<
    FeatureTypeId,
    {
      y: string;
      n: string;
    }
  >;
  itemFeatures: DbItemFeatures;
  items: Item[];
  datasheets: Datasheets;
  brands: Record<BrandId, Brand>;
  manufacturers: Record<ManufacturerId, Manufacturer>;
  docs: Docs;
  applications: Applications;
  footer: {
    bottom: string;
  };
};
