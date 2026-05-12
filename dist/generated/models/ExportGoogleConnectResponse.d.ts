export type ExportGoogleConnectResponse = {
    ok: boolean;
    connected: boolean;
    provider: string;
    connectUrl: string | null;
    error?: string | null;
    errorCode?: string | null;
    message?: string | null;
};
