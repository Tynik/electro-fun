import {
  ApplicationIdT,
  DatasheetIdT,
  DocIdT,
  FeatureSectionIdT,
  FeatureIdT,
  CategoryIdT,
  ManufacturerIdT
} from './ids';

import { ItemT, ItemFeatureValueTypeT } from './item';

export * from './ids';
export * from './item';
export * from './user';

export type ArticleT = {}

export type SeoT = {
  title: string
  description: string
  keywords: string
}

export type CategoryT = {
  id: CategoryIdT
  name: string
  icon: string
}

export type ManufacturerT = {
  name: string
  url: string
  logo: string
}

export type ApplicationT = string
export type ApplicationsT = Record<ApplicationIdT, ApplicationT>

export type FeatureDefinitionSuffixT = string | Record<ItemFeatureValueTypeT, string>

export enum FeatureTypeIdT {
  bool
}

export type FeatureDefinitionT = {
  name: string
  suffix?: FeatureDefinitionSuffixT
  categories?: CategoryIdT[]
  featSecRefId?: FeatureSectionIdT
  type?: FeatureTypeIdT
}

export type DbItemFeaturesT = Record<FeatureIdT, FeatureDefinitionT>

export type AbbreviationNameT = string

export type AbbreviationsT = Record<AbbreviationNameT, {
  url: string
  lang: string
}>

export type ClarificationNameT = string

export type ClarificationsT = Record<ClarificationNameT, {
  url: string
  lang: string
}>

export type DbMetaT = {
  parts: number
}

export type DatasheetT = {
  url: string
  lang: string
  manufacturerId?: ManufacturerIdT
  version?: string
  description?: string
}

export type FoundDatasheetT = DatasheetT & {
  // when datasheets should be sorted
  priority?: number
}

export type DatasheetsT = Record<DatasheetIdT, DatasheetT>

export type FoundDatasheetsT = Record<DatasheetIdT, FoundDatasheetT>

export type DocT = {
  name: string
  url: string
}

export type DocsT = Record<DocIdT, DocT>

export type MenuItemT = {
  name: string
  url: string
  icon: string
}

export type DbT = {
  siteName: string
  siteURL: string
  seo: SeoT
  abbreviations: AbbreviationsT
  clarifications: ClarificationsT
  menu: MenuItemT[]
  articles: ArticleT[]
  categories: CategoryT[]
  featureSections: Record<FeatureSectionIdT, string>
  optionTypes: Record<FeatureTypeIdT, {
    y: string
    n: string
  }>
  itemFeatures: DbItemFeaturesT
  items: ItemT[]
  datasheets: DatasheetsT
  manufacturers: Record<ManufacturerIdT, ManufacturerT>
  docs: DocsT
  applications: ApplicationsT
  footer: {
    bottom: string
  }
}
