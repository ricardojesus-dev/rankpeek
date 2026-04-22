export function scoreDepth(data:{
    textLength: number
}) {
    let score = 10
    const issues: string[] = []

    if(data.textLength < 300){
        score -= 5;
        issues.push("Very low content depth");
    }
    if(data.textLength < 100){
        score -= 5;
        issues.push("Almost empty page");
    }

    return {score , issues}
}