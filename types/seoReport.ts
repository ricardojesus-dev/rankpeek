export type SeoReportData = {
  url?: string
  title?: string
  h1?: string[]
  h2?: string[]
  h3?: string[]

  metaDescription?: string

  canonical?: string
  lang?: string

  ogTitle?: string
  ogDescription?: string

  textLength?: number

  score?: number
  breakdown?: string[]
}