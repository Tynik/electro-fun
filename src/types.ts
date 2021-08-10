export type Article = {}

export type FeatureSectionId = number;
export type CategoryId = number;
export type OptionId = number;

export enum ItemOptionValueType {
  axis,
  range,
}

export type ItemOption = {
  idRef: OptionId
  value: string | (string | {
    type: ItemOptionValueType,
    value: string
  })[]
  comment?: string
}

export type ItemImage = {
  alt: string
  src: string
}

export type ItemImages = (string | ItemImage)[];

export type ExternalResourceLink = {
  name: string
  url: string
  icon?: string
  iconAlt: string
}

export type Item = {
  title: string
  content: string
  id?: string
  options?: ItemOption[]
  subtitle?: string
  images?: ItemImages
  datasheetLink?: string
  buyLink?: string
  companyLink?: string
  externalLinks?: ExternalResourceLink[]
}

export type OptionDefinitionSuffix = string | Record<ItemOptionValueType, string>

export type OptionDefinition = {
  name: string
  suffix?: OptionDefinitionSuffix
  categories?: CategoryId[]
  featureSectionRef?: FeatureSectionId
}

export type DbOptions = Record<OptionId, OptionDefinition>

export type Db = {
  menu: {
    title: string
    name: string
    icon: string
  }[]
  seo: {
    title: string
    description: string
    keywords: string
  }
  articles: Article[]
  featureSections: Record<FeatureSectionId, string>
  categories: Record<CategoryId, string>
  options: DbOptions
  items: Item[]
}
