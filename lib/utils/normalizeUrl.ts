export function normalizeUrl(input: string) : string {
    const trimmed = input.trim();

    if(!trimmed) return "";

    try {
        const hasProtocol = /^https?:\/\//i.test(trimmed);
        const urlWithProtocol = hasProtocol ? trimmed : `https://${trimmed}`;

        const url = new URL(urlWithProtocol);
        console.log(url.toString())
        return url.toString();
    } catch {
        throw new Error("Invalid URL fomrat");
    }
}