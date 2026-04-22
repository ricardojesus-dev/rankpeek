// components/SeoReport.tsx
import type { SeoReportData } from "@/types/seoReport"
type Props = {
    data: SeoReportData | null
}

export default function SeoReport({ data }: Props) {
    
    if (!data) {
        return (
            <div style={{
                marginTop:40,
                textAlign:"center",
                color:"#666"
            }}>
            <h2>Welcome to RankPeek</h2>
            <p>Enter a URL to analyze its SEO structure</p>

            <div style={{
                marginTop:10,
                fontSize:"12px",
                opacity:0.7
            }}>
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
    const scoreColor = data.score ? getColor(data.score) : "gray"

    return (
        <div className="mt-8 grid gap-6 text-white max-w-5xl mx-auto">
    
            {/* SCORE SECTION*/}
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <h2 className="text-zinc-400">SEO Score</h2>

                <div className={`text-7xl font-bold ${scoreColor}`}>
                    {data.score}
                </div>
            </div>

            {/* INFO GRID*/}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <h3 className="text-zinc-400 mb-3">Content</h3>

                    <div className="text-sm space-y-2">
                        <div><strong>Title:</strong> {data.title}</div>

                        <div>
                        <strong>H1:</strong>
                        <ul className="text-zinc-300">
                            {data.h1?.map((h, i) => (
                            <li key={i}>• {h}</li>
                            ))}
                        </ul>
                        </div>

                        <div><strong>Meta:</strong> {data.metaDescription || "Missing"}</div>
                    </div>
                </div>
                <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <h3 className="text-zinc-400 mb-3">Structure</h3>

                    <div className="text-sm space-y-2">
                        <div>H1 count: {data.h1?.length}</div>
                        <div>H2 count: {data.h2?.length}</div>
                        <div>H3 count: {data.h3?.length}</div>
                </div>
            </div>
            </div>

            

            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-zinc-400 mb-3">Technical</h3>

                <div className="text-sm space-y-2">
                    <div>Lang: {data.lang || "Missing"}</div>
                    <div>Canonical: {data.canonical ? "✔" : "✖"}</div>
                    <div>OG Title: {data.ogTitle ? "✔" : "✖"}</div>
                    <div>OG Description: {data.ogDescription ? "✔" : "✖"}</div>
                </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-zinc-400 mb-3">Content Depth</h3>

                <div className="text-sm">
                    {data.textLength} characters
                </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-zinc-400 mb-3">Issues & Analysis</h3>

                <ul className="text-sm text-zinc-300 space-y-1">
                    {data.breakdown?.map((b, i) => (
                    <li key={i}>• {b}</li>
                    ))}
                </ul>
            </div>

            
            {/* <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            
            <h3 className="mb-3 text-zinc-300">Insights</h3>

                <div className="flex flex-wrap gap-2">
                
                {data.issues?.map((issue, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-red-500/20 text-red-400">
                        {issue}
                    </span>
                ))}

                {data.warnings?.map((w, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400">
                        {w}
                    </span>
                ))}

                {data.good?.map((g, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-400">
                        {g}
                    </span>
                ))}
                </div>
            </div> */}
        </div>
    )
}