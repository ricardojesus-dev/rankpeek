import * as cheerio from "cheerio"
import { calculateScore } from "@/lib/score";

export async function POST(req: Request) {
    const body = await req.json();
    const url = body.url;

    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);

    const title = $("title").text();
    const h1 = $("h1").first().text();

    const metaDescription = 
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="twitter:description"]').attr("content") ||
    ""

    const score = calculateScore({
        title,
        h1,
        metaDescription
    })

    const issues: string[] = []
    const warnings: string[] = []
    const good: string[] = []

    if (!title) issues.push("Missing title")
    if (!h1) issues.push("Missing H1")
    if (!metaDescription) issues.push("Missing meta description")

    if (title && title.length > 60) {
        warnings.push("Title is too long")
    }

    if (!metaDescription) {
        warnings.push("No meta description found")
    }

    if (title) good.push("Title exists")
    if (h1) good.push("H1 exists")
    if (metaDescription) good.push("Meta description exists")
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