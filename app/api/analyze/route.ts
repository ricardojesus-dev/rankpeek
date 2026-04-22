// app/api/analyze/route.ts
export const runtime = "nodejs"

import { analyzeService } from "@/server/analyze/analyzeService";
import { extractSeo } from "@/server/seo/seoParser";
import { generateInsights } from "@/lib/insights";
import { calculateScoreV2 } from "@/lib/score/index";



async function analyzeUrl(url:string) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(),10000)

    try {
        const res = await fetch(url, {signal: controller.signal});

        if (!res.ok){
            throw new Error("URL returned non-200 response");
        }

        const html = await res.text();

        if(!html){
            throw new Error("Empty HTML response");
        }

        const seoData = extractSeo(html);

        const {score, breakdown} = calculateScoreV2(seoData);

        const insights = generateInsights(seoData);

        return {
            url,
            ...seoData,
            score,
            breakdown,
            ...insights,
        };
    } finally {
        clearTimeout(timeout);
    }
    
}


export async function POST(req: Request) {
    try {
        const {url} = await req.json();

        if (!url || typeof url !== "string"){
            return Response.json(
                {error:"Invalid URL"},
                {status:400}
            )
        }

        const result = await analyzeService(url);
        return Response.json(result);


    } catch (err) {
        console.error(err)
        return Response.json(
            {error: "Internal server error"},
            {status:500}
        )
    }
}