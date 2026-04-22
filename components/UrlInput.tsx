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
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto mt-10">
        
            <input
                type="text"
                placeholder="Enter a website URL (https://...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zing-900 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />

            <button
                onClick={handleAnalyze}
                disabled={loading || !url}
                className="w-full py-3 rounded-xl font-semibold transition
                        bg-white text-black hover:bg-zinc-200
                        disabled:opacity-40 disabled:cursor-not-allowed"
                >
                {loading ? "Analyzing..." : "Analyze SEO"}
            </button>
            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}
            
            
        </div>
    )
}