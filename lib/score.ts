type SeoData = {
    title?: string,
    h1?: string,
    metaDescription?:string
}

export function calculateScore(data: SeoData){
    let score = 100;
    if(!data.title) score -= 20
    if(!data.h1) score -= 15
    if(!data.metaDescription) score -= 20

    return Math.max(score,0)
}