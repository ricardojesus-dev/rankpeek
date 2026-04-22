// lib/score/index.ts
import { scoreContent } from "./content";
import { scoreStructure } from "./structure";
import { scoreTechnical } from "./technical";
import { scoreDepth } from "./depth";
import { SeoInputData, SeoNormalizedInput } from "@/types/seoReport";

function normalize(input: SeoInputData):SeoNormalizedInput {
    return {
        title: input.title ?? "",
        metaDescription: input.metaDescription ?? "",
        h1: input.h1 ?? [],
        h2: input.h1 ?? [],
        h3: input.h1 ?? [],
        textLength: input.textLength ?? 0,
        canonical: input.canonical ?? "",
        images: {
            total: input.images?.total ?? 0,
            withoutAlt: input.images?.withoutAlt ?? 0
        },
        links: {
            internal: input.links?.internal ?? 0,
            external: input.links?.external ?? 0
        }
    }
}

export function calculateScoreV2(input: SeoInputData){
    const safe = normalize(input);

    const content = scoreContent(safe);
    const structure = scoreStructure(safe);
    const technical = scoreTechnical(safe);
    const depth = scoreDepth(safe);

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
