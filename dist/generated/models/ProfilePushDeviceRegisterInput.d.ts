export type ProfilePushDeviceRegisterInput = {
    token: string;
    provider?: string;
    platform?: string;
    nativeToken?: string | null;
    deviceId?: string | null;
    deviceName?: string | null;
    appVersion?: string | null;
    locale?: string | null;
    timezone?: string | null;
    storeId?: string | null;
};
