// app/page.tsx
"use client"
import { useState } from "react"
import UrlInput from "@/components/UrlInput"
import SeoReport from "@/components/SeoReport"
import type { SeoReportData } from "@/types/seoReport"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [data, setData] = useState<SeoReportData | null>(null)

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4">
        <UrlInput setData={setData} />
        <SeoReport data={data} />
      </main>
    </div>
  )
}