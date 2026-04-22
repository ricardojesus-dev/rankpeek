import type { SeoReportData } from "@/types/seoReport"

export default function SeoReport({ data }: { data: SeoReportData | null }) {
  if (!data) return <div> TA MAAAL</div>

  return (
    <div>
      <h2>SEO Report</h2>

      <p>Score: {data.score}</p>
      <p>Title: {data.title}</p>
      <p>H1: {data.h1}</p>
      <p>Meta: {data.metaDescription}</p>
    </div>
  )
}