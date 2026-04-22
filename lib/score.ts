// lib/score.ts
type SeoData = {
    title?: string,
    h1?: string,
    metaDescription?:string
}

export function calculateScore(data: SeoData){
    let score = 100;
    
    if(!data.title) {
        score -= 40
    } else {
        if (data.title.length < 10) score -= 10;
        if (data.title.length > 60) score -= 10;
    }

    if(!data.h1) {
        score -= 25
    } else {
        if (data.h1.length < 5) score -= 5
    }

    if(!data.metaDescription) {
        score -= 25
    } else {
        if (data.metaDescription.length < 50) score -= 10
        if (data.metaDescription.length > 150) score -= 10 
    }

    const hasAll = data.title && data.h1 && data.metaDescription

    if (!hasAll){
        score -= 10
    } else {
        score += 5
    }

    if(score < 0) score = 0
    if(score > 100) score = 100
    return score
}