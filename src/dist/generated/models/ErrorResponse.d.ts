export type ErrorResponse = {
    error: string | null;
    message?: string | null;
    code?: string | null;
    allowed?: Array<string>;
    ok: boolean;
};
