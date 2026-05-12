export type ExportGoogleStatusResponse = {
    ok: boolean;
    connected: boolean;
    provider: string;
    integrationId?: string | null;
};
