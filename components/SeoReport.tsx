type Props = {
    data:any
}

export default function SeoReport({ data }: Props) {
    if (!data) return null
        
    const scoreColor = 
        data.score > 80
        ? "green"
        : data.score > 50
        ? "orange"
        : "red"

    return (
        <div style={{marginTop:20}}>
        <h2>SEO Report</h2>
        {/* SCORE */}
        <div style = {{fontSize:32, fontWeight:"bold", color:scoreColor}}>
            {data.score} / 100
        </div>

        {/* INFO */}
        <p><strong>Title: {data.title}</strong></p>
        <p><strong>H1: {data.h1}</strong></p>
        <p><strong>Meta: {data.metaDescription || "Missing"}</strong></p>
        </div>
    )
}