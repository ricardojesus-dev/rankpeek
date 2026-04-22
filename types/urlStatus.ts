export type UrlStatus = 
    | "idle"
    | "invalid_format"
    | "valid_format"
    | "checking"
    | "reachable"
    | "unreachable"
    | "timeout";