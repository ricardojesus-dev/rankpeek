// @/components/UrlInput.tsx
"use client"
import { useState } from "react"
import type { SeoReportData } from "@/types/seoReport";
type Props = {
    setData: (data:SeoReportData) => void
}

export default function UrlInput({ setData }: Props){
    const [url, setUrl] = useState("");
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    async function handleAnalyze() {
        setLoading(true);
        setError(null);
        try{
            const res = await fetch('/api/analyze',{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({url})
            });
            if(!res.ok){
                throw new Error("API Error");
            }

            const data = await res.json();
            setData(data);
            setUrl("")

        } catch (error){
            setError("Something went wrong analyzing the URL")
            console.error("Error: ", error);
        } finally{
            setLoading(false);
        }

        
        
    }
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "500px",
            margin: "0 auto"
            }}>
        
            <input
                type="text"
                placeholder="Enter a website URL (https://...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px"
                }}
                />

            <button
                onClick={handleAnalyze}
                disabled={loading || !url}
                style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: loading ? "#999" : "#000",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
                >
                {loading ? "Analyzing..." : "Analyze SEO"}
            </button>
            {error && (
                <p style={{ color: "red", fontSize: "12px" }}>
                    {error}
                </p>
            )}
            
            
        </div>
    )
}