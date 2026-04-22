"use client"

import { BarChart3, Sparkles } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950">

      {/* BRAND */}
      <div className="flex items-center gap-3 cursor-pointer group">

        {/* Logo */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition">
          <BarChart3 size={18} className="text-black" />
        </div>

        {/* Name */}
        <div className="flex flex-col leading-tight">
          <span className="text-white font-semibold text-lg tracking-tight">
            RankPeek
          </span>
          <span className="text-[10px] text-zinc-500">
            SEO Analyzer
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Status badge */}
        {/* <div className="hidden md:flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
          <Sparkles size={12} />
          v2 Engine
        </div> */}

        {/* Future CTA */}
        <button className="text-sm text-zinc-300 hover:text-white transition">
          Dashboard
        </button>

      </div>

    </nav>
  )
}