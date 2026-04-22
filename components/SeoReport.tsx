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
        <div className="mt-8 flex flex-col gap-5 text-white">
    
            {/* SCORE SECTION*/}
            <div className="p-6 rounded-xl bg-zinc-900 text-center border border-zinc-800">
                <h2 className="text-lg text-zinc-400">SEO Score</h2>

                <div className={`text-6xl font-bold ${scoreColor}`}>
                    {data.score}/100
                </div>
            </div>

            {/* INFO GRID*/}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
                <div><strong>Title:</strong> {data.title}</div>
                <div><strong>H1:</strong> {data.h1}</div>
                <div><strong>Meta:</strong> {data.metaDescription || "Missing"}</div>
            </div>

            {/* INSIGHTS */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            
            <h3 className="mb-3 text-zinc-300">Insights</h3>

                <div className="flex flex-wrap gap-2">
                {/* ISSUES */}
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
            </div>
        </div>
    )
}