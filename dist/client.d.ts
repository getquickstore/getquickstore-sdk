import type { CreateOrderRequest } from "./generated/models/CreateOrderRequest";
import type { UpdateOrderStatusRequest } from "./generated/models/UpdateOrderStatusRequest";
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
        resendLoginTwoFactor: (challengeId: string) => import("./generated").CancelablePromise<{
            ok: boolean;
        }>;
        register: (name: string, email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        me: () => Promise<import("./generated").AuthMeResponse>;
        refresh: (refreshToken?: string) => Promise<any>;
        logout: (data?: {
            refreshToken?: string | null;
        }) => import("./generated").CancelablePromise<void>;
        createWebHandoff: (data?: {
            nextPath?: string;
        }) => Promise<{
            ok?: boolean;
            url?: string;
            expiresAt?: string;
            nextPath?: string;
        }>;
        magicLinkRequest: (email: string) => import("./generated").CancelablePromise<import("./generated").OkResponse>;
        magicLinkVerifyByToken: (token: string) => import("./generated").CancelablePromise<import("./generated").AuthTokenPairOnlyResponse>;
        magicLinkVerifyByCode: (data: {
            email?: string;
            code: string;
        }) => import("./generated").CancelablePromise<import("./generated").AuthTokenPairOnlyResponse>;
        forgotPassword: (email: string) => import("./generated").CancelablePromise<void>;
        resetPassword: (data: {
            token: string;
            password: string;
        }) => import("./generated").CancelablePromise<void>;
        requestPasswordReset: (email: string) => import("./generated").CancelablePromise<{
            ok?: boolean;
        }>;
        confirmPasswordReset: (data: {
            token: string;
            newPassword: string;
        }) => import("./generated").CancelablePromise<{
            ok?: boolean;
        }>;
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
        confirmEmailChange: (token: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            email: string;
        }>;
        startReAuth: (action: string) => Promise<{
            ok: boolean;
            challengeId: string;
            method: "TOTP" | "EMAIL_OTP";
            expiresAt: string;
        }>;
        verifyReAuth: (data: {
            challengeId: string;
            code: string;
        }) => Promise<{
            ok: boolean;
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
    availability: {
        list: (customStoreId?: string) => Promise<import("./generated").AvailabilityListResponse>;
        upsert: (data: any, customStoreId?: string) => Promise<import("./generated").AvailabilityItemResponse>;
        bulk: (items: any[], customStoreId?: string) => Promise<import("./generated").AvailabilityListResponse>;
        update: (id: string, data: any, customStoreId?: string) => Promise<import("./generated").AvailabilityItemResponse>;
        delete: (id: string, customStoreId?: string) => Promise<void>;
        publicServiceSlots: (serviceId: string, date: string, storeId: string) => import("./generated").CancelablePromise<import("./generated").PublicServiceSlotsResponse>;
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
    bookings: {
        me: () => Promise<import("./generated").BookingListResponse>;
        list: (params?: {
            status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
            serviceId?: string;
            dateFrom?: string;
            dateTo?: string;
            storeId?: string;
        }) => Promise<import("./generated").BookingListResponse>;
        create: (data: any, customStoreId?: string) => Promise<import("./generated").Booking>;
        get: (id: string, customStoreId?: string) => Promise<import("./generated").Booking>;
        update: (id: string, data: any, customStoreId?: string) => Promise<import("./generated").Booking>;
        cancel: (id: string, customStoreId?: string) => Promise<import("./generated").Booking>;
    };
    calendar: {
        getDay: (date: string, customStoreId?: string) => Promise<import("./generated").CalendarResponse>;
        getWeek: (date: string, customStoreId?: string) => Promise<import("./generated").CalendarResponse>;
    };
    cart: {
        get: () => Promise<import("./generated").CartResponse>;
        add: (data: any) => Promise<import("./generated").CartSingleResponse>;
        setQty: (data: any) => Promise<import("./generated").CartSingleResponse>;
        remove: (data: any) => Promise<import("./generated").CartSingleResponse>;
        clear: () => Promise<import("./generated").CartResponse>;
    };
    categories: {
        list: (params?: {
            limit?: number;
            offset?: number;
            q?: string;
            storeId?: string;
        }) => Promise<import("./generated").CategoryListResponse>;
        create: (data: any, customStoreId?: string) => Promise<import("./generated").Category>;
        update: (id: string, data: any, customStoreId?: string) => Promise<import("./generated").Category>;
        delete: (id: string, customStoreId?: string) => Promise<import("./generated").OkResponse>;
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
        getPublic: (params?: {
            q?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PublicStoreListResponse>;
        getPublicBySlug: (slug: string) => import("./generated").CancelablePromise<import("./generated").PublicStore>;
    };
    products: {
        list: (customStoreId?: string) => Promise<import("./generated").ProductListResponse>;
        get: (id: string, customStoreId?: string) => Promise<import("./generated").ProductDetail>;
        create: (data: any, customStoreId?: string) => Promise<import("./generated").ProductDetail>;
        update: (id: string, data: any, customStoreId?: string) => Promise<import("./generated").ProductDetail>;
    };
    orders: {
        list: (params?: {
            limit?: number;
            status?: "PENDING" | "PAID" | "PROCESSING" | "READY_FOR_PICKUP" | "FULFILLED" | "CANCELLED" | "REFUNDED";
            paymentStatus?: "REQUIRES_ACTION" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "REFUNDED";
            fulfillmentType?: "STANDARD" | "PICKUP";
            customerId?: string;
            storeId?: string;
        }) => Promise<import("./generated").OrderListResponse>;
        create: (data: CreateOrderRequest & {
            storeId?: string;
        }) => Promise<import("./generated").OrderSingleResponse>;
        get: (id: string, customStoreId?: string) => Promise<import("./generated").OrderSingleResponse>;
        updateStatus: (id: string, data: UpdateOrderStatusRequest, customStoreId?: string) => Promise<import("./generated").OrderSingleResponse>;
        cancel: (id: string, customStoreId?: string) => Promise<import("./generated").OrderSingleResponse>;
    };
    payments: {
        checkout: (data: {
            orderId: string;
            successUrl?: string;
            cancelUrl?: string;
        }) => Promise<import("./generated").PaymentCheckoutResponse>;
        refund: (paymentId: string, data?: any, customStoreId?: string) => Promise<import("./generated").CreateRefundResponse>;
    };
    reviews: {
        list: (productId: string, params?: {
            limit?: number;
            offset?: number;
            storeId?: string;
        }) => Promise<import("./generated").ReviewListResponse>;
        create: (productId: string, data: any, customStoreId?: string) => Promise<import("./generated").Review>;
        flag: (productId: string, reviewId: string, customStoreId?: string) => Promise<import("./generated").FlagReviewResponse>;
    };
    services: {
        list: (customStoreId?: string, includeInactive?: boolean) => Promise<import("./generated").ServiceListResponse>;
        create: (data: any, customStoreId?: string) => Promise<import("./generated").Service>;
        getAvailability: (id: string, date: string, customStoreId?: string) => Promise<import("./generated").ServiceAvailabilityResponse>;
    };
};
export {};
