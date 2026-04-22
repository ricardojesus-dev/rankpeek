import * as cheerio from "cheerio"

export function extractSeo(html: string) {
    const $ = cheerio.load(html)

    const title = $("title").text()
    const h1 = $("h1").first().text()

    const metaDescription =
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        ""

    return {
        title,
        h1,
        metaDescription
    }
}