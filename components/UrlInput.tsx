// @/components/UrlInput.tsx
"use client"
import { useState } from "react"

type Props = {
    setData: (data:any) => void
}

export default function UrlInput({ setData }: Props){
    const [url, setUrl] = useState("");
    
    async function handleAnalyze() {
        const res = await fetch('/api/analyze',{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({url})
        });

        const data = await res.json();
        setData(data);

        console.log(data);
        
    }
    return(
        <div>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={ (e) => setUrl(e.target.value)}
            />

            <button onClick={handleAnalyze}>
                Analyze
            </button>
            
            
        </div>
    )
}