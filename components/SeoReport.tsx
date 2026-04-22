type Props = {
    data:any
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
    const scoreColor = getColor(data.score);

    return (
        <div style={{marginTop:30}}>
    
            {/* SCORE SECTION*/}
            <div style={{textAlign:"center", marginBottom:20}}>
                <h2>SEO Report</h2>
                <div style = {{fontSize:48, fontWeight:"bold", color:scoreColor}}>
                    {data.score} / 100
                </div>
            </div>

            {/* INFO GRID*/}
            <div style={{display:"grid",gap:10}}>
                <div><strong>Title:</strong> {data.title}</div>
                <div><strong>H1:</strong> {data.h1}</div>
                <div><strong>Meta:</strong> {data.metaDescription || "Missing"}</div>
            </div>
        </div>
    )
}