// components/UrlInput.tsx
"use client"

import { useState } from "react"
import type { SeoReportData } from "@/types/seoReport"
import { Search, Loader2, Link as LinkIcon } from "lucide-react"

type Props = {
  setData: (data: SeoReportData) => void
}

export default function UrlInput({ setData }: Props) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    setLoading(true)
    setError(null)

    try {
        
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      
      if (!res.ok) {
        throw new Error(data?.error || "API Error")
      }

      
      setData(data)
      setUrl("")
    } catch (error) {
      setError("Something went wrong analyzing the URL")
      console.error("Error: ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 max-w-xl mx-auto mt-12">

      {/* INPUT WRAPPER */}
      <div className="w-full relative">

        {/* ICON */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          <LinkIcon size={16} />
        </div>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500 
                     focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500
                     transition"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !url}
        className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition
                   bg-white text-black hover:bg-zinc-200
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search size={16} />
            Analyze SEO
          </>
        )}
      </button>

      {/* ERROR */}
      {error && (
        <div className="w-full p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            ⚠ {error}
        </div>
        )}

    </div>
  )
}