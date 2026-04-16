export type ErrorResponse = {
    ok: boolean;
    error?: string | null;
    message?: string | null;
    code?: string | null;
    allowed?: Array<string> | null;
};
