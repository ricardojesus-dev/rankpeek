import { calculateScore } from "@/lib/score";
import { extractSeo } from "@/lib/seoParser";
import { generateInsights } from "@/lib/insights";

export async function POST(req: Request) {
    const {url} = await req.json();

    const res = await fetch(url);
    const html = await res.text();

    const {title,h1,metaDescription} = extractSeo(html)


    const score = calculateScore({
        title,
        h1,
        metaDescription
    })

    const {issues, warnings, good} = generateInsights({
        title,
        h1,
        metaDescription
    })
    return Response.json({
        url, 
        title,
        h1,
        metaDescription,
        score,
        issues,
        warnings,
        good
    });
}