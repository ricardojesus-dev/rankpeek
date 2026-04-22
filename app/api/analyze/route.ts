import * as cheerio from "cheerio"

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
    null


    return Response.json({
        url, 
        title,
        h1,
        metaDescription
    });
}