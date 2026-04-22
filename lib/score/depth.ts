// lib/score/depth.ts
export function scoreDepth(data:{
    textLength: number
    images?: {
        total: number
        withoutAlt: number
    }
    links?:{
        internal:number
        external:number
    }
}) {
    let score = 20;
    const issues: string[] = []

    //Text Depth
    if(data.textLength < 300){
        score -= 5;
        issues.push("Very low content depth");
    }
    if(data.textLength < 100){
        score -= 5;
        issues.push("Almost empty page");
    }

    //Images
    if (data.images){
        if (data.images.withoutAlt > 0){
            score -= 5
            issues.push(`${data.images.withoutAlt} images missing alt text`);
        }
    }

    //Links
    if (data.links) {
        if (data.links.internal === 0){
            score -= 5
            issues.push("No internal links found");
        }
    }
    return {score , issues}
}