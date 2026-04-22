// components/UrlInput.tsx
"use client"

import { useState } from "react"
import type { SeoReportData } from "@/types/seoReport"
import { Search, Loader2, Link as LinkIcon } from "lucide-react"
import { normalizeUrl } from "@/lib/utils/normalizeUrl"
import { UrlStatus } from "@/types/urlStatus"
import { isValidUrl } from "@/lib/utils/urlValidator"


type Props = {
  setData: (data: SeoReportData) => void
}

export default function UrlInput({ setData }: Props) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [status, setStatus] = useState<UrlStatus>("idle");

  async function handleAnalyze() {

    setError(null)
    if(!isValidUrl(url)){
        setStatus("invalid_format");
        setError("Invalid URL format");
        return;
    }

    setStatus("valid_format");
    setLoading(true);
    setStatus("checking");

    try {
      const cleanUrl = normalizeUrl(url)

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.error || "API Error")
      
      setStatus("reachable");
      setData(data);
      setUrl("");
    } catch (error: unknown) {
      setStatus("unreachable")
      const message =
        error instanceof Error
        ? error.message
        : "Something went wrong analyzing the URL";
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 max-w-lg mx-auto pt-14 px-4">

      {/* Hero heading */}
      <div className="text-center space-y-2 mb-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          Analyze any URL&apos;s{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
            SEO health
          </span>
        </h1>
        <p className="text-[11px] font-mono text-zinc-600 tracking-widest uppercase">
          Instant technical audit
        </p>
      </div>

      {/* Input */}
      <div className="w-full relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
          <LinkIcon size={15} />
        </div>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && url && !loading && handleAnalyze()}
          disabled={loading}
          className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-700 font-mono text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50
                     disabled:opacity-50 transition-all duration-200"
        />
      </div>
      
      {status !== "idle" && (
        <p className="text-[11px] font-mono text-zinc-500 mt-2">
            Status: {status}
        </p>
       )}

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !url}
        className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200
                   bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40
                   hover:-translate-y-0.5 active:translate-y-0
                   disabled:bg-zinc-900 disabled:border disabled:border-zinc-800 disabled:text-zinc-700 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Analyzing…
          </>
        ) : (
          <>
            <Search size={15} />
            Analyze SEO
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="w-full px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-xs font-mono text-center tracking-wide animate-in fade-in slide-in-from-top-1 duration-200">
          ⚠ {error}
        </div>
      )}
    </div>
  )
}