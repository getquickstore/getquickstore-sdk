type ClientConfig = {
    baseUrl: string;
    token?: string;
    storeId?: string;
};
export declare function createClient({ baseUrl, token, storeId }: ClientConfig): {
    auth: {
        login: (email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        verifyLoginTwoFactor: (data: {
            challengeId: string;
            code: string;
            trustDevice?: boolean;
            deviceFingerprint?: string | null;
        }) => import("./generated").CancelablePromise<{
            ok: boolean;
            accessToken: string;
            refreshToken: string;
        }>;
        register: (name: string, email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        me: () => Promise<import("./generated").AuthMeResponse>;
        refresh: () => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        logout: () => import("./generated").CancelablePromise<void>;
        getTwoFactorStatus: () => Promise<{
            ok?: boolean;
            enabled?: boolean;
            method?: string | null;
            verifiedAt?: string | null;
        }>;
        getSessions: () => Promise<{
            ok?: boolean;
            items?: Array<{
                id?: string;
                status?: string | null;
                ip?: string | null;
                userAgent?: string | null;
                deviceFingerprint?: string | null;
                isTrusted?: boolean | null;
                createdAt?: string;
                lastSeenAt?: string | null;
                expiresAt?: string | null;
                revokedAt?: string | null;
                revokeReason?: string | null;
            }>;
        }>;
        changePassword: (data: {
            currentPassword: string;
            newPassword: string;
        }) => Promise<{
            ok?: boolean;
            revokedOtherSessions?: boolean;
            preservedCurrentSession?: boolean;
        }>;
        confirmEmailVerification: (token: string) => import("./generated").CancelablePromise<{
            ok?: boolean;
        }>;
        requestEmailVerification: (email: string) => Promise<{
            ok?: boolean;
            alreadyVerified?: boolean;
        }>;
        requestEmailChange: (newEmail: string) => Promise<{
            ok?: boolean;
        }>;
        startTwoFactorSetup: () => Promise<{
            ok: boolean;
            method: string;
            base32Secret: string;
            otpauthUrl: string;
        }>;
        confirmTwoFactorSetup: (code: string) => Promise<{
            ok: boolean;
            recoveryCodes: Array<string>;
        }>;
        disableTwoFactor: (data: {
            code?: string;
            recoveryCode?: string;
        }) => Promise<{
            ok: boolean;
        }>;
        regenerateRecoveryCodes: (code: string) => Promise<{
            ok: boolean;
            recoveryCodes: Array<string>;
        }>;
        revokeSession: (data: {
            sessionId?: string;
            revokeAllOther?: boolean;
            currentSessionId?: string;
        }) => Promise<{
            ok?: boolean;
            alreadyRevoked?: boolean;
        }>;
    };
    billing: {
        current: () => Promise<import("./generated").BillingCurrentResponse>;
        storeCurrent: (id: string) => Promise<import("./generated").BillingCurrentResponse>;
        checkout: (data: {
            storeId?: string;
            successUrl?: string;
            cancelUrl?: string;
        }) => Promise<import("./generated").BillingCheckoutResponse>;
        portal: (data: {
            storeId?: string;
            returnUrl?: string;
        }) => Promise<import("./generated").BillingPortalResponse>;
        cancel: (data: {
            storeId?: string;
        }) => Promise<import("./generated").BillingCancelResponse>;
    };
    stripeConnect: {
        status: () => Promise<import("./generated").StripeConnectStatusResponse>;
        disconnect: (id: string) => Promise<{
            ok?: boolean;
            storeId?: string;
            stripe?: {
                stripeAccountId?: string | null;
                stripeStatus?: string;
                stripeOnboardingComplete?: boolean;
                stripeDetailsSubmitted?: boolean;
                stripeChargesEnabled?: boolean;
                stripePayoutsEnabled?: boolean;
                stripeRequirementsJson?: any;
            };
        }>;
        statusByStore: (id: string) => Promise<import("./generated").StripeConnectStatusResponse>;
        start: (data: {
            returnUrl: string;
            refreshUrl: string;
        }) => Promise<import("./generated").BillingStripeConnectStartResponse>;
        sync: () => Promise<import("./generated").StripeConnectStatusResponse>;
    };
    stores: {
        list: () => Promise<import("./generated").StoreListResponse>;
        create: (data: any) => Promise<import("./generated").CreateStoreResponse>;
        me: () => Promise<import("./generated").StoresMeResponse>;
        getById: (id: string) => Promise<import("./generated").StoreDetailsResponse>;
        update: (id: string, data: {
            name?: string;
        }) => Promise<import("./generated").UpdateStoreResponse>;
        select: (id: string) => Promise<import("./generated").StoreSelectResponse>;
        setVisibility: (id: string, isPublic: boolean) => Promise<import("./generated").UpdateStoreVisibilityResponse>;
        archive: (id: string) => Promise<import("./generated").StoreDeleteResponse>;
    };
    categories: {
        list: () => Promise<import("./generated").CategoryListResponse>;
        create: (data: any) => Promise<import("./generated").Category>;
    };
    products: {
        list: () => Promise<import("./generated").ProductListResponse>;
        get: (id: string) => Promise<import("./generated").ProductDetail>;
        create: (data: any) => Promise<import("./generated").ProductDetail>;
    };
    orders: {
        list: () => Promise<import("./generated").OrderListResponse>;
        get: (id: string) => Promise<import("./generated").OrderSingleResponse>;
        create: (data: any) => Promise<import("./generated").OrderSingleResponse>;
    };
};
export {};
