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
    const getColor = (score:number) => {
        if (score >= 80) return "green"
        if (score >= 50) return "orange"
        return "red"
    }
    const scoreColor = data.score ? getColor(data.score) : "gray"

    return (
        <div style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
    
            {/* SCORE SECTION*/}
            <div style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#f5f5f5",
                textAlign: "center"
                }}>
                <h2>SEO Score</h2>

                <div style={{
                    fontSize: 56,
                    fontWeight: "bold",
                    color: scoreColor
                }}>
                    {data.score}/100
                </div>
            </div>

            {/* INFO GRID*/}
            <div style={{
                padding: "20px",
                borderRadius: "12px",
                background: "white",
                border: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
                }}>
                <div><strong>Title:</strong> {data.title}</div>
                <div><strong>H1:</strong> {data.h1}</div>
                <div><strong>Meta:</strong> {data.metaDescription || "Missing"}</div>
            </div>

            {/* INSIGHTS */}
            <div style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#fafafa"
            }}>
                <h3 style={{ marginBottom: "10px" }}>Insights</h3>

                <div style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                }}>
                {data.issues?.map((issue, i) => (
                    <span key={i} style={{
                        background: "#ffe5e5",
                        color: "#c00",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px"
                    }}>
                        {issue}
                    </span>
                ))}

                {data.warnings?.map((warning, i) => (
                    <span key={i} style={{
                        background: "#fff4e5",
                        color: "#b36b00",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px"
                    }}>
                        {warning}
                    </span>
                ))}

                {data.good?.map((good, i) => (
                    <span key={i} style={{
                        background: "#e6ffe6",
                        color: "#0a7a0a",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px"
                    }}>
                        {good}
                    </span>
                ))}
                </div>
            </div>
        </div>
    )
}