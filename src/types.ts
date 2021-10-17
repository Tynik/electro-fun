export type Article = {}

export type ItemOptionId = string
export type FeatureSectionId = number
export type CategoryId = number
export type FeatureId = number
export type DatasheetId = string
export type DocId = string

export enum ItemFeatureValueType {
  axis,
  range,
}

export type Seo = {
  title: string
  description: string
  keywords: string
}

export type Category = {
  id: CategoryId
  name: string
  icon?: string
}

export type ItemFeatureMultiValue = string | {
  value: string | string[]
  type?: ItemFeatureValueType,
  info?: string
}

export type ItemFeature = {
  refId: FeatureId
  value: string | ItemFeatureMultiValue[]
  info?: string
}

export type ItemImage = {
  alt: string
  src: string
}

export type ItemApplication = string

export enum ItemDriverSrcSource {
  GITHUB = 'github',
}

export type ItemDriverSrc = {
  source: ItemDriverSrcSource
  userId: number
}

export type ItemDriver = {
  name: string
  url: string
  src?: ItemDriverSrc
}

export type ItemExternalLink = {
  name: string
  url: string
  lang: string
  icon?: string
  iconAlt: string
}

export type ItemOption = {
  name: string
  default?: boolean
}

export type ItemOptions = Record<ItemOptionId, ItemOption>

export type Item = {
  title: string
  subtitle: string
  lang: string
  id?: string
  categoryId?: number
  content?: string
  warningContent?: string
  seo?: Seo & { title?: string }
  datasheetId?: string
  buyLink?: string
  companyLink?: string
  options?: ItemOptions
  features?: ItemFeature[]
  images?: ItemImage[]
  original?: boolean
  applications?: ItemApplication[]
  drivers?: ItemDriver[]
  externalLinks?: ItemExternalLink[]
}

export type FeatureDefinitionSuffix = string | Record<ItemFeatureValueType, string>

export enum FeatureTypeId {
  bool
}

export type FeatureDefinition = {
  name: string
  suffix?: FeatureDefinitionSuffix
  categories?: CategoryId[]
  featSecRefId?: FeatureSectionId
  type?: FeatureTypeId
}

export type DbItemFeatures = Record<FeatureId, FeatureDefinition>

export type Abbreviations = Record<string, {
  url: string
  lang: string
}>
export type Clarifications = Record<string, {
  url: string
  lang: string
}>

export type DbMeta = {
  parts: number
}

export type Datasheet = {
  url: string
  lang: string
  version?: string
  description?: string
}

export type Doc = {
  name: string
  url: string
}

export type MenuItem = {
  name: string
  url: string
  icon: string
}

export type Db = {
  siteName: string
  seo: Seo
  abbreviations: Abbreviations
  clarifications: Clarifications
  menu: MenuItem[]
  articles: Article[]
  categories: Category[]
  featureSections: Record<FeatureSectionId, string>
  optionTypes: Record<FeatureTypeId, {
    y: string
    n: string
  }>
  itemFeatures: DbItemFeatures
  items: Item[]
  datasheets: Record<DatasheetId, Datasheet>
  docs: Record<DocId, Doc>
  footer: {
    bottom: string
  }
}
