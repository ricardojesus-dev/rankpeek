type SeoData = {
  title?: string
  metaDescription?: string
  h1?: string[]
  images?: {
    total: number
    withoutAlt: number
  }
  links?: {
    internal: number
    external: number
  }
  wordCount?: number
  ogTitle?: string
  ogDescription?: string
}

export function generateInsights(data: SeoData) {
  const issues: string[] = []
  const warnings: string[] = []
  const good: string[] = []

  // TITLE
  if (!data.title) issues.push("Missing title")
  else good.push("Title exists")

  // META
  if (!data.metaDescription) issues.push("Missing meta description")
  else good.push("Meta description exists")

  // H1
  const h1Count = data.h1?.length ?? 0

  if (h1Count === 0) issues.push("Missing H1")
  else if (h1Count > 1) warnings.push("Multiple H1 tags detected")
  else good.push("Single H1 present")

  // IMAGES
  if (data.images?.withoutAlt && data.images.withoutAlt > 0) {
    warnings.push(`${data.images.withoutAlt} images missing alt text`)
  } else if (data.images?.total) {
    good.push("Images optimized")
  }

  // WORD COUNT
  if (data.wordCount && data.wordCount < 300) {
    warnings.push("Low word count (<300 words)")
  } else if (data.wordCount) {
    good.push("Good content length")
  }

  // LINKS
  if (data.links?.internal === 0) {
    warnings.push("No internal links found")
  } else if (data.links?.internal) {
    good.push("Internal links detected")
  }

  if (data.links?.external && data.links.external > 0) {
    good.push("External links present")
  }

  // OG
  if (!data.ogTitle) warnings.push("Missing OG title")
  else good.push("OG title present")

  if (!data.ogDescription) warnings.push("Missing OG description")
  else good.push("OG description present")

  return { issues, warnings, good }
}