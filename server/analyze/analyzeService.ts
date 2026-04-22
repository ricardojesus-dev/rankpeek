import { fetchHtml } from "../seo/fetchHtml";
import { extractSeo } from "../seo/seoParser";
import { generateInsights } from "@/lib/insights";
import { calculateScoreV2 } from "@/lib/score/index";

export async function analyzeService(url:string){

    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort()
    }, 10000);

    try {
        const html = await fetchHtml(url);

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
            ...insights
        }
    } finally {
        clearTimeout(timeout);
    }
}