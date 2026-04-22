// @/components/UrlInput.tsx
"use client"
import { useState } from "react"

type Props = {
    setData: (data:any) => void
}

export default function UrlInput({ setData }: Props){
    const [url, setUrl] = useState("");
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    async function handleAnalyze() {
        setLoading(true);
        try{
            const res = await fetch('/api/analyze',{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({url})
            });

            const data = await res.json();
            setData(data);
            setUrl("")

        } catch (error){
            setError("Something went wrong analyzing the URL")
            console.error("Error: ", error);
        }

        setLoading(false);
        
    }
    return(
        <div>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={ (e) => setUrl(e.target.value)}
            />

            <button onClick={handleAnalyze} disabled = {loading || !url}>
                {loading ? "Analyzing...":"Analize"}
            </button>
            
            
        </div>
    )
}