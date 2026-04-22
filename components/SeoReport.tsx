// components/SeoReport.tsx
import type { SeoReportData } from "@/types/seoReport"
import ScoreCircle from "@/components/ScoreCircle"
import { getSeoGrade } from "@/lib/score/grade"

import {
  BarChart3,
  FileText,
  Heading,
  LayoutList,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ImageIcon,
  Link2,
} from "lucide-react"

type Props = { data: SeoReportData | null }

// ── Shared card shell ──────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// ── Card top-label bar ─────────────────────────────────────────────────────────
function CardLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 px-5 pt-4 pb-3 border-b border-zinc-800/60">
      <Icon size={13} className="text-zinc-600" />
      <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">{label}</span>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function SeoReport({ data }: Props) {

  if (!data) {
    return (
      <div className="mt-20 flex flex-col items-center gap-3 text-center px-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <BarChart3 size={20} className="text-zinc-700" />
        </div>
        <h2 className="text-lg font-bold text-zinc-300 tracking-tight">Enter a URL to get started</h2>
        <p className="text-sm text-zinc-600 max-w-xs">
          Paste any public URL above and get an instant breakdown of its SEO structure.
        </p>
        <span className="text-[11px] font-mono text-zinc-700 tracking-widest mt-1">
          EXAMPLE: HTTPS://EXAMPLE.COM
        </span>
      </div>
    )
  }

  const score = data.score ?? 0
  const withoutAlt = data.images?.withoutAlt ?? 0
  const totalImages = data.images?.total ?? 0
  const altCoverage = totalImages > 0 ? Math.round(((totalImages - withoutAlt) / totalImages) * 100) : 100

  return (
    <div className="mt-10 max-w-5xl mx-auto px-4 pb-16 space-y-5">

      {/* ── SCORE ── centered hero ─────────────────────────────────────────── */}
      <Card className="flex flex-col items-center gap-2 py-10">
        <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-2">Overall SEO Score</span>
        <ScoreCircle score={score} />
        <p className="text-xs text-zinc-600 mt-3 max-w-xs text-center leading-relaxed">
          {score >= 80
            ? "Great shape — minor tweaks can push this further."
            : score >= 50
            ? "Room to improve — check the issues below."
            : "Needs attention — several critical items missing."}
        </p>
      </Card>

      {/* ── CONTENT ── text-heavy, label + value stacked ─────────────────────── */}
      <Card>
        <CardLabel icon={FileText} label="Content" />
        <div className="divide-y divide-zinc-800/60">

          {/* Title */}
          <div className="px-5 py-4">
            <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase block mb-1">Page Title</span>
            {data.title
              ? <p className="text-sm text-zinc-100 leading-snug font-medium">{data.title}</p>
              : <p className="text-sm text-red-400 flex items-center gap-1.5"><XCircle size={13} /> Missing — critical for SEO</p>
            }
          </div>

          {/* Meta description */}
          <div className="px-5 py-4">
            <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase block mb-1">Meta Description</span>
            {data.metaDescription
              ? <p className="text-sm text-zinc-300 leading-relaxed">{data.metaDescription}</p>
              : <p className="text-sm text-red-400 flex items-center gap-1.5"><XCircle size={13} /> Missing — affects click-through rate</p>
            }
          </div>

          {/* H1 */}
          <div className="px-5 py-4">
            <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase block mb-2">H1 Headings</span>
            {data.h1 && data.h1.length > 0 ? (
              <ul className="space-y-1.5">
                {data.h1.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Heading size={13} className="mt-0.5 shrink-0 text-indigo-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-400 flex items-center gap-1.5"><XCircle size={13} /> No H1 found</p>
            )}
          </div>

        </div>
      </Card>

      {/* ── STRUCTURE + CONTENT DEPTH side by side ────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* STRUCTURE — big numbers */}
        <Card>
          <CardLabel icon={LayoutList} label="Heading Structure" />
          <div className="px-5 py-5 grid grid-cols-3 gap-3">
            {[
              { tag: "H1", count: data.h1?.length ?? 0 },
              { tag: "H2", count: data.h2?.length ?? 0 },
              { tag: "H3", count: data.h3?.length ?? 0 },
            ].map(({ tag, count }) => (
              <div key={tag} className="flex flex-col items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/40 py-4 gap-1">
                <span className="text-2xl font-bold font-mono text-zinc-100 tabular-nums">{count}</span>
                <span className="text-[10px] font-mono text-zinc-600 tracking-widest">{tag}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CONTENT DEPTH — single big stat */}
        <Card>
          <CardLabel icon={FileText} label="Content Depth" />
          <div className="px-5 py-5 flex flex-col justify-center gap-3">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold font-mono text-zinc-100 tabular-nums leading-none">
                {(data.textLength ?? 0).toLocaleString()}
              </span>
              <span className="text-[11px] font-mono text-zinc-600 tracking-widest mb-1">CHARS</span>
            </div>
            {/* mini progress bar for content richness */}
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    (data.textLength ?? 0) >= 2000
                      ? "bg-emerald-500"
                      : (data.textLength ?? 0) >= 800
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(((data.textLength ?? 0) / 3000) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-600">
                {(data.textLength ?? 0) >= 2000
                  ? "Rich content"
                  : (data.textLength ?? 0) >= 800
                  ? "Moderate content"
                  : "Thin content — consider expanding"}
              </span>
            </div>
          </div>
        </Card>

      </div>

      {/* ── IMAGES + LINKS side by side ───────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* IMAGES — donut-style alt coverage */}
        <Card>
          <CardLabel icon={ImageIcon} label="Images" />
          <div className="px-5 py-5 flex items-center gap-5">
            {/* big number */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/40 w-20 h-20 shrink-0 gap-0.5">
              <span className="text-2xl font-bold font-mono text-zinc-100">{totalImages}</span>
              <span className="text-[9px] font-mono text-zinc-600 tracking-widest">TOTAL</span>
            </div>
            {/* alt coverage */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Alt text coverage</span>
                <span className={`text-xs font-mono font-semibold ${altCoverage === 100 ? "text-emerald-400" : altCoverage >= 70 ? "text-amber-400" : "text-red-400"}`}>
                  {altCoverage}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${altCoverage === 100 ? "bg-emerald-500" : altCoverage >= 70 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${altCoverage}%` }}
                />
              </div>
              <span className={`text-[10px] font-mono ${withoutAlt > 0 ? "text-red-400" : "text-emerald-400"}`}>
                {withoutAlt > 0 ? `${withoutAlt} image${withoutAlt > 1 ? "s" : ""} missing alt text` : "All images have alt text"}
              </span>
            </div>
          </div>
        </Card>

        {/* LINKS — internal vs external split */}
        <Card>
          <CardLabel icon={Link2} label="Links" />
          <div className="px-5 py-5 grid grid-cols-2 gap-3">
            {[
              { label: "Internal", count: data.links?.internal ?? 0, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
              { label: "External", count: data.links?.external ?? 0, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
            ].map(({ label, count, color, bg }) => (
              <div key={label} className={`flex flex-col items-center justify-center rounded-xl border py-5 gap-1 ${bg}`}>
                <span className={`text-3xl font-bold font-mono tabular-nums ${color}`}>{count}</span>
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* ── TECHNICAL ── 2x2 check grid ───────────────────────────────────────── */}
      <Card>
        <CardLabel icon={Globe} label="Technical SEO" />
        <div className="grid grid-cols-2 gap-px bg-zinc-800/60 border-t border-zinc-800/60">
          {[
            { label: "Language attr.", sublabel: "lang=", ok: !!data.lang },
            { label: "Canonical URL", sublabel: "rel=canonical", ok: !!data.canonical },
            { label: "OG Title", sublabel: "og:title", ok: !!data.ogTitle },
            { label: "OG Description", sublabel: "og:description", ok: !!data.ogDescription },
          ].map(({ label, sublabel, ok }) => (
            <div key={label} className="bg-zinc-900 px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-zinc-200 font-medium">{label}</p>
                <p className="text-[10px] font-mono text-zinc-600 mt-0.5">{sublabel}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold shrink-0 ${
                ok ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                   : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {ok ? <CheckCircle size={11} /> : <XCircle size={11} />}
                {ok ? "OK" : "Missing"}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── ISSUES ── severity-coded list ─────────────────────────────────────── */}
      <Card>
        <CardLabel icon={AlertTriangle} label="Issues & Analysis" />
        <ul className="divide-y divide-zinc-800/60">
          {data.breakdown && data.breakdown.length > 0 ? (
            data.breakdown.map((b, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span className="text-sm text-zinc-300 leading-snug">{b}</span>
              </li>
            ))
          ) : (
            <li className="flex items-center gap-2.5 px-5 py-4 text-sm text-emerald-400">
              <CheckCircle size={14} />
              No issues detected — looking great!
            </li>
          )}
        </ul>
      </Card>

      {/* ── INSIGHTS ── grouped tag cloud ─────────────────────────────────────── */}
      {((data.issues?.length ?? 0) + (data.warnings?.length ?? 0) + (data.good?.length ?? 0)) > 0 && (
        <Card>
          <CardLabel icon={BarChart3} label="Insights" />
          <div className="px-5 py-5 space-y-4">

            {(data.issues?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-red-500/70 tracking-widest uppercase">Issues</span>
                <div className="flex flex-wrap gap-2">
                  {data.issues!.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                      <XCircle size={11} />{item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(data.warnings?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-500/70 tracking-widest uppercase">Warnings</span>
                <div className="flex flex-wrap gap-2">
                  {data.warnings!.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <AlertTriangle size={11} />{item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(data.good?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-500/70 tracking-widest uppercase">Good</span>
                <div className="flex flex-wrap gap-2">
                  {data.good!.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle size={11} />{item}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </Card>
      )}

    </div>
  )
}