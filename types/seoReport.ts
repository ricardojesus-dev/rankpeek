// types/seoReports.ts
export type SeoInputData = {
    url?:string
    title?:string
    h1?: string[]
    h2?: string[]
    h3?: string[]
    lang?: string
    canonical?: string
    textLength?: number
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string

    images?: {
        total: number
        withoutAlt: number
    }

    links?: {
        internal: number
        external: number
    }

    wordCount?: number

}
export type SeoReportData = SeoInputData & {

  score?: number
  breakdown?: string[]

  issues?: string[]
  warnings?: string[]
  good?: string[]
}

export type SeoNormalizedInput = {
    title: string
    metaDescription: string
    h1: string[]
    h2: string[]
    h3: string[]
    textLength: number
    canonical: string
    images : {
        total: number
        withoutAlt: number
    }
    links: {
        internal: number
        external: number
    }
}