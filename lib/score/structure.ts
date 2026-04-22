// lib/score/structure.ts
export function scoreStructure(data: {
    h1: string[]
    h2: string[]
    h3: string[]
    
}) {
    let score = 25;
    const issues:string[] = []

    if (data.h2.length === 0){
        score -= 10;
        issues.push("Missing H2 tags");
    }

    if (data.h1.length !== 1){
        score -= 10
        issues.push("Invalid H1 structure");
    }

    if (data.h3.length > data.h2.length * 2){
        score -= 5;
        issues.push("Weak heading hierarchy")
    }

    return { score, issues};
}