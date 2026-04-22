import type { SeoReportData } from "@/types/seoReport"
import ScoreCircle from "@/components/ScoreCircle"
import {
  BarChart3,
  FileText,
  Heading,
  LayoutList,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react"

type Props = {
  data: SeoReportData | null
}

export default function SeoReport({ data }: Props) {

  if (!data) {
    return (
      <div className="mt-16 text-center text-zinc-500">
        <h2 className="text-xl font-semibold text-zinc-300">
          Welcome to RankPeek
        </h2>
        <p className="mt-2">
          Enter a URL to analyze its SEO structure
        </p>

        <div className="mt-3 text-xs opacity-60">
          Example: https://example.com
        </div>
      </div>
    )
  }

  const getColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  const scoreColor = data.score ? getColor(data.score) : "text-zinc-400"

  return (
    <div className="mt-8 grid gap-6 text-white max-w-5xl mx-auto">

      {/* SCORE */}
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-sm">
        <div className="flex items-center justify-center gap-2 text-zinc-400 mb-2">
          <BarChart3 size={18} />
          <span>SEO Score</span>
        </div>

        <ScoreCircle score={data.score ?? 0} />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* CONTENT */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-zinc-400">
            <FileText size={16} />
            <h3>Content</h3>
          </div>

          <div className="text-sm space-y-3">

            <div>
              <span className="text-zinc-500">Title</span>
              <p className="text-white break-words">
                {data.title || "Missing"}
              </p>
            </div>

            <div>
              <span className="text-zinc-500">H1</span>
              <ul className="text-zinc-300 mt-1 space-y-1">
                {data.h1 && data.h1.length > 0 ? (
                  data.h1.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Heading size={14} className="mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-red-400">Missing</li>
                )}
              </ul>
            </div>

            <div>
              <span className="text-zinc-500">Meta Description</span>
              <p className="text-zinc-300 break-words">
                {data.metaDescription || "Missing"}
              </p>
            </div>

          </div>
        </div>

        {/* STRUCTURE */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-zinc-400">
            <LayoutList size={16} />
            <h3>Structure</h3>
          </div>

          <div className="text-sm space-y-2">
            <div>H1: {data.h1?.length ?? 0}</div>
            <div>H2: {data.h2?.length ?? 0}</div>
            <div>H3: {data.h3?.length ?? 0}</div>
          </div>
        </div>

      </div>

      {/* TECHNICAL */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="flex items-center gap-2 mb-3 text-zinc-400">
          <Globe size={16} />
          <h3>Technical</h3>
        </div>

        <div className="text-sm space-y-3">

          <div className="flex justify-between items-center">
            <span>Lang</span>
            {data.lang
              ? <CheckCircle size={16} className="text-green-400" />
              : <XCircle size={16} className="text-red-400" />}
          </div>

          <div className="flex justify-between items-center">
            <span>Canonical</span>
            {data.canonical
              ? <CheckCircle size={16} className="text-green-400" />
              : <XCircle size={16} className="text-red-400" />}
          </div>

          <div className="flex justify-between items-center">
            <span>OG Title</span>
            {data.ogTitle
              ? <CheckCircle size={16} className="text-green-400" />
              : <XCircle size={16} className="text-red-400" />}
          </div>

          <div className="flex justify-between items-center">
            <span>OG Description</span>
            {data.ogDescription
              ? <CheckCircle size={16} className="text-green-400" />
              : <XCircle size={16} className="text-red-400" />}
          </div>

        </div>
      </div>

      {/* CONTENT DEPTH */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="flex items-center gap-2 mb-3 text-zinc-400">
          <FileText size={16} />
          <h3>Content Depth</h3>
        </div>

        <div className="text-sm text-zinc-300">
          {data.textLength ?? 0} characters
        </div>
      </div>

      {/* BREAKDOWN */}
      <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="flex items-center gap-2 mb-3 text-zinc-400">
          <AlertTriangle size={16} />
          <h3>Issues & Analysis</h3>
        </div>

        <ul className="text-sm space-y-2">
          {data.breakdown && data.breakdown.length > 0 ? (
            data.breakdown.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300">
                <span className="text-red-400 mt-1">•</span>
                <span>{b}</span>
              </li>
            ))
          ) : (
            <li className="text-green-400 flex items-center gap-2">
              <CheckCircle size={16} />
              No issues detected
            </li>
          )}
        </ul>
      </div>

    </div>
  )
}