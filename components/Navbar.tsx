export default function Navbar() {
    return (
        <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950">
            
            {/* BRAND */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-white" />
                <span className="text-white font-semibold text-lg">
                    RankPeek
                </span>
            </div>

            {/* FUTURE ACTIONS */}
            <div className="text-zinc-400 text-sm">
                SEO Analyzer
            </div>

        </nav>
    )
}