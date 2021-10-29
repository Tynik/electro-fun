export type ArticleT = {}

export type ItemOptionIdT = string
export type FeatureSectionIdT = number
export type CategoryIdT = number
export type FeatureIdT = number
export type DatasheetIdT = string
export type DocIdT = string

export enum ItemFeatureValueTypeT {
  axis,
  range,
}

export type SeoT = {
  title: string
  description: string
  keywords: string
}

export type CategoryT = {
  id: CategoryIdT
  name: string
  icon?: string
}

export type ItemFeatureMultiValueT = string | {
  value: string | string[]
  type?: ItemFeatureValueTypeT,
  info?: string
}

export type ItemFeatureT = {
  refId: FeatureIdT
  value: string | ItemFeatureMultiValueT[]
  info?: string
}

export type ItemImageT = {
  alt: string
  src: string
}

export type ApplicationIdT = string
export type ApplicationT = string
export type ApplicationsT = Record<ApplicationIdT, ApplicationT>

export enum ItemDriverSrcSourceT {
  GITHUB = 'github',
}

export type ItemDriverSrcT = {
  source: ItemDriverSrcSourceT
  userId: number
}

export type ItemDriverT = {
  name: string
  url: string
  src?: ItemDriverSrcT
}

export type ItemExternalLinkT = {
  name: string
  url: string
  lang: string
  icon?: string
  iconAlt: string
}

export type ItemOptionT = {
  name: string
  default?: boolean
}

export type ItemOptionsT = Record<ItemOptionIdT, ItemOptionT>

export type ItemIdT = string

export type ItemT = {
  title: string
  subtitle: string
  lang: string
  id?: ItemIdT
  categoryId?: number
  developedBy?: string
  content?: string
  warningContent?: string
  seo?: SeoT & { title?: string }
  datasheetId?: DatasheetIdT
  buyLink?: string
  companyLink?: string
  options?: ItemOptionsT
  features?: ItemFeatureT[]
  images?: ItemImageT[]
  original?: boolean
  applicationIds?: ApplicationIdT[]
  drivers?: ItemDriverT[]
  externalLinks?: ItemExternalLinkT[]
  relatedDatasheetIds?: DatasheetIdT[]
}

export type ItemsT = ItemT[]

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

export type AbbreviationsT = Record<string, {
  url: string
  lang: string
}>
export type ClarificationsT = Record<string, {
  url: string
  lang: string
}>

export type DbMetaT = {
  parts: number
}

export type DatasheetT = {
  url: string
  lang: string
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
  docs: DocsT
  applications: ApplicationsT
  footer: {
    bottom: string
  }
}
