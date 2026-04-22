// server/seo/fetchHtml.ts
export async function fetchHtml(url:string) : Promise<string> {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000);

    try {
        const res = await fetch(url,{
            headers: {
                "User-Agent":"RankPeekAgent/1.1",
            },
        })

        if (!res.ok){
            throw new Error(`Failed to fetch: ${res.status}`)
        }
        return await res.text()
    } finally {
        clearTimeout(timeout);
    }
    
    
    
}