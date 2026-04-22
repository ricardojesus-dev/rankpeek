// lib/score/index.ts
import { scoreContent } from "./content";
import { scoreStructure } from "./structure";
import { scoreTechnical } from "./technical";
import { scoreDepth } from "./depth";

export function calculateScoreV2(input: any){
    const content = scoreContent(input);
    const structure = scoreStructure(input);
    const technical = scoreTechnical(input);
    const depth = scoreDepth(input);

    const score = 
        content.score +
        structure.score +
        technical.score +
        depth.score

    const breakdown = [
        ...content.issues,
        ...structure.issues,
        ...technical.issues,
        ...depth.issues
    ]

    return {
        score: Math.max(0, Math.min(100,score)),
        breakdown
    }
}
