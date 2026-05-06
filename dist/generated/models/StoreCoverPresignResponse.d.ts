export type StoreCoverPresignResponse = {
    ok: boolean;
    key: string;
    uploadUrl: string;
    url?: string | null;
    publicUrl?: string | null;
    expiresIn?: number | null;
    method: string;
    contentType: string;
};
