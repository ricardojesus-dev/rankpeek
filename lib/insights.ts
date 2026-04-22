type Input = {
    title: string
    h1: string
    metaDescription: string
}

export function generateInsights(data: Input) {
    const issues: string[] = []
    const warnings: string[] = []
    const good: string[] = []

    if (!data.title) issues.push("Missing title")
    if (!data.h1) issues.push("Missing H1")
    if (!data.metaDescription) issues.push("Missing meta description")

    if (data.title && data.title.length > 60) {
        warnings.push("Title is too long")
    }

    // if (!data.metaDescription) {
    //     warnings.push("No meta description found")
    // }

    if (data.title) good.push("Title exists")
    if (data.h1) good.push("H1 exists")
    if (data.metaDescription) good.push("Meta description exists")

    return {
        issues,
        warnings,
        good
    }
}