export type ExportGoogleConnectResponse = {
    ok?: boolean;
    error?: string | null;
    errorCode?: string | null;
    message?: string | null;
    connectUrl?: string | null;
    connected?: boolean | null;
    provider?: string | null;
};
