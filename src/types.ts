export type Article = {}

export type FeatureSectionId = number;
export type CategoryId = number;
export type OptionId = number;

export enum ItemOptionValueType {
  axis,
  range,
}

export type Seo = {
  title: string
  description: string
  keywords: string
}

export type ItemOption = {
  refId: OptionId
  value: string | (string | {
    type: ItemOptionValueType,
    value: string | string[]
  })[]
  comment?: string
}

export type ItemImage = {
  alt: string
  src: string
}

export type ExternalResourceLink = {
  name: string
  url: string
  icon?: string
  iconAlt: string
}

export type Item = {
  title: string
  subtitle: string
  content: string
  id?: string
  warningContent?: string
  seo?: Seo & { title?: string }
  datasheetLink?: string
  buyLink?: string
  companyLink?: string
  options?: ItemOption[]
  images?: ItemImage[]
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

export type DbOptions = Record<OptionId, OptionDefinition>

export type Abbreviations = Record<string, string>
export type Clarifications = Record<string, string>

export type Db = {
  menu: {
    title: string
    name: string
    icon: string
  }[]
  seo: Seo
  abbreviations: Abbreviations
  clarifications: Clarifications
  articles: Article[]
  categories: Record<CategoryId, string>
  featureSections: Record<FeatureSectionId, string>
  optionTypes: Record<OptionTypeId, {
    y: string
    n: string
  }>
  options: DbOptions
  items: Item[]
}
