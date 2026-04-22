import { extractSeo } from "@/lib/seoParser";
import { generateInsights } from "@/lib/insights";
import { calculateScoreV2 } from "@/lib/score/index";


export async function POST(req: Request) {
    const {url} = await req.json();

    const res = await fetch(url);
    const html = await res.text();

    const SeoData = extractSeo(html)
    const {score, breakdown} = calculateScoreV2(SeoData);

    const insights = generateInsights(SeoData)

    
    return Response.json({
        url,
        ...SeoData,
        score,
        breakdown,
        ...insights
    })
}