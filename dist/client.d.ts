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
        checkout: (data?: {
            successUrl?: string | null;
            cancelUrl?: string | null;
        }) => Promise<import("./generated").BillingCheckoutResponse>;
        portal: (data?: {
            returnUrl?: string | null;
        }) => Promise<import("./generated").BillingPortalResponse>;
        cancel: () => Promise<import("./generated").BillingCancelResponse>;
    };
    stripeConnect: {
        status: () => Promise<import("./generated").StripeConnectStatusResponse>;
        statusByStore: (id: string) => Promise<import("./generated").StripeConnectStatusResponse>;
        start: (data: {
            returnUrl: string;
            refreshUrl: string;
        }) => Promise<import("./generated").BillingStripeConnectStartResponse>;
        sync: () => Promise<import("./generated").StripeConnectStatusResponse>;
    };
    stores: {
        create: (data: any) => Promise<import("./generated").CreateStoreResponse>;
        me: () => Promise<import("./generated").StoresMeResponse>;
        select: (id: string) => Promise<import("./generated").StoreSelectResponse>;
        setVisibility: (id: string, isPublic: boolean) => Promise<import("./generated").UpdateStoreVisibilityResponse>;
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
