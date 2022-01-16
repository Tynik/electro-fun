import {
  ApplicationIdT,
  DatasheetIdT,
  ItemIdT,
  ItemOptionIdT,
  FeatureIdT,
  CategoryIdT,
  ManufacturerIdT
} from './ids';
import { SeoT } from '.';

export enum ItemFeatureValueTypeT {
  axis,
  range,
}

export type ItemSeoT = SeoT & {
  title?: string
  measurement?: string
}

export type ItemFeatureMultiValueT = string | {
  value: string | string[]
  type?: ItemFeatureValueTypeT
  info?: string
}

export type ItemFeatureT = {
  refId: FeatureIdT
  value: string | ItemFeatureMultiValueT[]
  info?: string | string[]
  optionId?: string
}

export type ItemImageT = {
  alt: string
  src: string
  description?: string
  optionId?: string
}

export enum ItemContributorSrcSourceT {
  GITHUB = 'github',
}

export type ItemContributorSrcT = {
  source: ItemContributorSrcSourceT
  userId: number
}

export type ItemContributorT = {
  name: string
  url: string
  src?: ItemContributorSrcT
}

export type ItemCodeExampleLibT = {
  name: string
  url: string
}

export type ItemCodeExampleT = {
  name: string
  code: string
  libs?: ItemCodeExampleLibT[]
}

export type ItemExternalLinkT = {
  name: string
  url: string
  lang: string
  icon?: string
  iconAlt?: string
}

export type ItemOptionT = {
  name: string
  default?: boolean
}

export type ItemOptionsT = Record<ItemOptionIdT, ItemOptionT>

export type ItemAccessory = {
  name: string
  count: number
}

export type ItemT = {
  title: string
  subtitle: string
  lang: string
  id?: ItemIdT
  categoryId?: CategoryIdT
  seo?: ItemSeoT
  manufacturerId?: ManufacturerIdT
  companyLink?: string
  original?: boolean
  content?: string
  warningContent?: string
  datasheetId?: DatasheetIdT
  relatedDatasheetIds?: DatasheetIdT[]
  availability?: number | Record<ItemOptionIdT, number>
  price?: number | Record<ItemOptionIdT, number>
  // link where is to buy or true/false
  buy?: string | boolean
  options?: ItemOptionsT
  features?: ItemFeatureT[]
  images?: ItemImageT[]
  applicationIds?: ApplicationIdT[]
  accessories?: ItemAccessory[]
  contributors?: ItemContributorT[]
  externalLinks?: ItemExternalLinkT[]
  codeExamples?: ItemCodeExampleT[]
}

export type ItemsT = ItemT[]
