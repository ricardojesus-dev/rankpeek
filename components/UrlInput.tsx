// @/components/UrlInput.tsx
"use client"
import { useState } from "react"

export default function UrlInput(){
    const [url, setUrl] = useState("");
    
    function handleAnalyze() {
        console.log(`Analizando ${url}`);
        
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
            
            <p>{url}</p>
        </div>
    )
}