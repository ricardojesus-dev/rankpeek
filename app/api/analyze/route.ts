// app/api/analyze/route.ts
export const runtime = "nodejs"

import { extractSeo } from "@/lib/seoParser";
import { generateInsights } from "@/lib/insights";
import { calculateScoreV2 } from "@/lib/score/index";


export async function POST(req: Request) {
    try {
        const {url} = await req.json();

        if (!url || typeof url !== "string"){
            return Response.json(
                {error:"Invalid URL"},
                {status:400}
            )
        }

        const controller = new AbortController();
        const timeout = setTimeout( () => controller.abort(), 10000);

        let res: Response;
        try  {
            res = await fetch(url, {signal: controller.signal});

        } catch {
            return Response.json(
                {error: "Failed to fetch URL"},
                {status:500}
            )
        } finally {
            clearTimeout(timeout)
        }

        if(!res.ok){
            return Response.json(
                {error:"URL return non-200 response"},
                {status:400}
            )
        }

        const html = await res.text();

        if(!html){
            return Response.json(
                {error:"Empty HTML response"},
                {status:400}
            )
        }
        
        const SeoData = extractSeo(html);

        const {score, breakdown} = calculateScoreV2(SeoData);

        const insights = generateInsights(SeoData)

        return Response.json({
            url,
            ...SeoData,
            score,
            breakdown,
            ...insights
        })

    } catch {
        return Response.json(
            {error: "Internal server error"},
            {status:500}
        )
    }
}