// lib/score/content.ts
export function scoreContent(data: {
    title:string
    metaDescription:string
    h1: string[]
}){
    let score = 30;
    const issues: string[] = [];

    //Title
    if(!data.title){
        score -= 15;
        issues.push("Missing Title");
    } else {
        if (data.title.length < 10){
            score -= 5;
            issues.push("Title too short");
        }
        if (data.title.length > 60){
            score -= 5;
            issues.push("Title too long");
        }
    }

    //Meta
    if (!data.metaDescription){
        score -= 15;
        issues.push("Missing meta description");
    }else {
        if(data.metaDescription.length < 50){
            score -= 5;
            issues.push("Meta too short");
        }
        if(data.metaDescription.length > 160){
            score -= 5;
            issues.push("Meta too long");
        }
    }

    //H1
    if (data.h1.length === 0){
        score -= 15;
        issues.push("Missing H1");
    }

    if (data.h1.length > 1){
        score -= 10
        issues.push("Multiple H1 tags");
    }

    return {score , issues}
}