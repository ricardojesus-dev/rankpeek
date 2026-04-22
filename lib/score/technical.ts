// lib/score/technical.ts
export function scoreTechnical(data: {
    canonical?:string
    lang?:string
    ogTitle?:string
    ogDescription?:string
}){
    let score = 25;
    const issues:string [] = []

    if(!data.canonical){
        score -= 5
        issues.push("Missing canonical tag");
    }
    
    if(!data.lang){
        score -= 5;
        issues.push("Mising html lang");
    }

    if (!data.ogTitle){
        score -= 5
        issues.push("Missing OG title");
    }

    if (!data.ogDescription){
        score -= 5
        issues.push("Missing OG description")
    }

    return {score , issues}
}