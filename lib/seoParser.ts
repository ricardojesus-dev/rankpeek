// lib/seoParser.ts
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

    const images = $("img")
    
    const totalImages = images.length
    const imagesWithoutAlt = images.filter(
        (_,img) => !$(img).attr("alt") || $(img).attr("alt")!.trim() === ""
    ).length

    const links = $("a");

    const internalLinks = links.filter( (_,a) => {
        const href = $(a).attr("href") || ""
        return href.startsWith("/") || href.includes("your-domain")
    }).length

    const externalLinks = links.length - internalLinks


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
        textLength,
        images: {
            total: totalImages,
            withoutAlt: imagesWithoutAlt
        },

        links: {
            internal: internalLinks,
            external: externalLinks
        }
    }
}