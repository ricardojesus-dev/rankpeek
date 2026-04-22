// components/Navbar.tsx
"use client"

import { BarChart3 } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-8 py-4 flex items-center justify-between bg-zinc-950/95 backdrop-blur border-b border-white/5">

      {/* BRAND */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-200">
          <BarChart3 size={17} className="text-white" strokeWidth={2.2} />
        </div>

        <div className="flex flex-col leading-none gap-0.5">
          <span className="text-zinc-100 font-bold text-[17px] tracking-tight">
            RankPeek
          </span>
          <span className="text-[10px] text-zinc-600 tracking-widest font-mono">
            SEO ANALYZER
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <button className="relative text-[13px] font-mono text-zinc-500 hover:text-zinc-200 tracking-wider transition-colors duration-150 group">
          Dashboard
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300" />
        </button>
        <div className="w-px h-4 bg-white/5" />
        <span className="text-[11px] font-mono text-zinc-700 tracking-widest">v2.0</span>
      </div>

    </nav>
  )
}