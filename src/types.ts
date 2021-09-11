export type Article = {}

export type FeatureSectionId = number;
export type CategoryId = number;
export type FeatureId = number;
export type DatasheetId = string;

export enum ItemOptionValueType {
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

export type ItemFeatureValue = string | (string | {
  type: ItemOptionValueType,
  value: string | string[]
})

export type ItemFeature = {
  refId: FeatureId
  value: ItemFeatureValue[]
  info?: string
}

export type ItemImage = {
  alt: string
  src: string
}

export type ExternalResourceLink = {
  name: string
  url: string
  lang: string
  icon?: string
  iconAlt: string
}

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
  features?: ItemFeature[]
  images?: ItemImage[]
  original?: boolean
  applications?: string[]
  externalLinks?: ExternalResourceLink[]
}

export type OptionDefinitionSuffix = string | Record<ItemOptionValueType, string>

export enum OptionTypeId {
  bool
}

export type OptionDefinition = {
  name: string
  suffix?: OptionDefinitionSuffix
  categories?: CategoryId[]
  featSecRefId?: FeatureSectionId
  type?: OptionTypeId
}

export type DbItemFeatures = Record<FeatureId, OptionDefinition>

export type Abbreviations = Record<string, string>
export type Clarifications = Record<string, string>

export type DbMeta = {
  parts: number
}

export type Datasheet = {
  url: string
  lang: string
  version?: string
  description?: string
}

export type Db = {
  siteName: string
  seo: Seo
  abbreviations: Abbreviations
  clarifications: Clarifications
  menu: {
    name: string
    url: string
    icon: string
  }[]
  articles: Article[]
  categories: Category[]
  featureSections: Record<FeatureSectionId, string>
  optionTypes: Record<OptionTypeId, {
    y: string
    n: string
  }>
  itemFeatures: DbItemFeatures
  items: Item[]
  datasheets: Record<DatasheetId, Datasheet>
  footer: {
    bottom: string
  }
}
