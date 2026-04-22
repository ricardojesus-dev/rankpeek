import * as cheerio from "cheerio"

export function extractSeo(html: string) {
    const $ = cheerio.load(html)

    const title = $("title").text()
    const h1 = $("h1").map((_,el) => $(el).text()).get()
    const h2 = $("h2").map((_,el) => $(el).text()).get()
    const h3 = $("h3").map((_,el) => $(el).text()).get()

    const metaDescription =
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        ""
    
    const canonical = $('link[rel="canonical"]').attr("href");
    const lang = $("html").attr("lang");

    const ogTitle = $('meta[property="og:title"]').attr("content");
    const ogDescription = $('meta[property="og:description"]').attr("content");

    const textLength = $("body").text().trim().length
    return {
        title,
        h1,
        h2,
        h3,
        metaDescription,
        canonical,
        lang,
        ogTitle,
        ogDescription,
        textLength
    }
}