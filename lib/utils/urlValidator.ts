export function isValidUrl(input: string): boolean {
    const trimmed = input.trim();

    if(!trimmed) return false

    if(!trimmed.includes(".")) return false

    try {
        const url = new URL(
             /^https?:\/\//i.test(trimmed)
             ? trimmed
             : `https://${trimmed}`
        );

        return url.hostname.includes(".");
    } catch {
        return false
    }
}