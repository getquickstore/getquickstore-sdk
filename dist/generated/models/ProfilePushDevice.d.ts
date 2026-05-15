export type ProfilePushDevice = {
    id?: string;
    userId?: string;
    storeId?: string | null;
    provider?: string;
    platform?: string;
    token?: string;
    nativeToken?: string | null;
    deviceId?: string | null;
    deviceName?: string | null;
    appVersion?: string | null;
    locale?: string | null;
    timezone?: string | null;
    enabled?: boolean;
    revokedAt?: string | null;
    lastSeenAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
};
