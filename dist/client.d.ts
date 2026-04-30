import type { CreateOrderRequest } from "./generated/models/CreateOrderRequest";
import type { UpdateOrderStatusRequest } from "./generated/models/UpdateOrderStatusRequest";
type ClientConfig = {
    baseUrl: string;
    token?: string | null;
    storeId?: string | null;
};
export declare function createClient({ baseUrl, token, storeId }: ClientConfig): {
    auth: {
        login: (email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        register: (name: string, email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        me: () => import("./generated").CancelablePromise<import("./generated").AuthMeResponse>;
        refresh: (refreshToken?: string | null) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        logout: (data?: {
            refreshToken?: string | null;
        }) => import("./generated").CancelablePromise<void>;
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
        createWebHandoff: (data?: {
            nextPath?: string;
        }) => import("./generated").CancelablePromise<{
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
        getTwoFactorStatus: () => import("./generated").CancelablePromise<{
            ok?: boolean;
            enabled?: boolean;
            method?: string | null;
            verifiedAt?: string | null;
        }>;
        getSessions: () => import("./generated").CancelablePromise<{
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
        }) => import("./generated").CancelablePromise<{
            ok?: boolean;
            revokedOtherSessions?: boolean;
            preservedCurrentSession?: boolean;
        }>;
        confirmEmailVerification: (token: string) => import("./generated").CancelablePromise<{
            ok?: boolean;
        }>;
        requestEmailVerification: (email: string) => import("./generated").CancelablePromise<{
            ok?: boolean;
            alreadyVerified?: boolean;
        }>;
        requestEmailChange: (newEmail: string) => import("./generated").CancelablePromise<{
            ok?: boolean;
        }>;
        confirmEmailChange: (token: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            email: string;
        }>;
        startReAuth: (action: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            challengeId: string;
            method: "TOTP" | "EMAIL_OTP";
            expiresAt: string;
        }>;
        verifyReAuth: (data: {
            challengeId: string;
            code: string;
        }) => import("./generated").CancelablePromise<{
            ok: boolean;
        }>;
        startTwoFactorSetup: () => import("./generated").CancelablePromise<{
            ok: boolean;
            method: string;
            base32Secret: string;
            otpauthUrl: string;
        }>;
        confirmTwoFactorSetup: (code: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            recoveryCodes: Array<string>;
        }>;
        disableTwoFactor: (data: {
            code?: string;
            recoveryCode?: string;
        }) => import("./generated").CancelablePromise<{
            ok: boolean;
        }>;
        regenerateRecoveryCodes: (code: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            recoveryCodes: Array<string>;
        }>;
        revokeSession: (data: {
            sessionId?: string;
            revokeAllOther?: boolean;
            currentSessionId?: string;
        }) => import("./generated").CancelablePromise<{
            ok?: boolean;
            alreadyRevoked?: boolean;
        }>;
    };
    analytics: {
        overview: (params?: {
            range?: "1d" | "7d" | "30d" | "90d";
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").AnalyticsOverviewResponse>;
    };
    availability: {
        list: (customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").AvailabilityListResponse>;
        upsert: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").AvailabilityItemResponse>;
        bulk: (items: any[], customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").AvailabilityListResponse>;
        update: (id: string, data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").AvailabilityItemResponse>;
        delete: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<void>;
        publicServiceSlots: (serviceId: string, date: string, storeId: string) => import("./generated").CancelablePromise<import("./generated").PublicServiceSlotsResponse>;
    };
    billing: {
        current: () => import("./generated").CancelablePromise<import("./generated").BillingCurrentResponse>;
        storeCurrent: (id: string) => import("./generated").CancelablePromise<import("./generated").BillingCurrentResponse>;
        checkout: (data: {
            storeId?: string;
            successUrl?: string;
            cancelUrl?: string;
        }) => import("./generated").CancelablePromise<import("./generated").BillingCheckoutResponse>;
        portal: (data: {
            storeId?: string;
            returnUrl?: string;
        }) => import("./generated").CancelablePromise<import("./generated").BillingPortalResponse>;
        cancel: (data: {
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").BillingCancelResponse>;
    };
    stripeConnect: {
        status: () => import("./generated").CancelablePromise<import("./generated").StripeConnectStatusResponse>;
        disconnect: (id: string) => import("./generated").CancelablePromise<{
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
        statusByStore: (id: string) => import("./generated").CancelablePromise<import("./generated").StripeConnectStatusResponse>;
        start: (data: {
            returnUrl: string;
            refreshUrl: string;
        }) => import("./generated").CancelablePromise<import("./generated").BillingStripeConnectStartResponse>;
        sync: () => import("./generated").CancelablePromise<import("./generated").StripeConnectStatusResponse>;
    };
    bookings: {
        me: () => import("./generated").CancelablePromise<import("./generated").BookingListResponse>;
        list: (params?: {
            status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
            serviceId?: string;
            dateFrom?: string;
            dateTo?: string;
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").BookingListResponse>;
        create: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Booking>;
        get: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Booking>;
        update: (id: string, data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Booking>;
        cancel: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Booking>;
    };
    calendar: {
        getDay: (date: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").CalendarResponse>;
        getWeek: (date: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").CalendarResponse>;
    };
    cart: {
        get: () => import("./generated").CancelablePromise<import("./generated").CartResponse>;
        add: (data: any) => import("./generated").CancelablePromise<import("./generated").CartSingleResponse>;
        setQty: (data: any) => import("./generated").CancelablePromise<import("./generated").CartSingleResponse>;
        remove: (data: any) => import("./generated").CancelablePromise<import("./generated").CartSingleResponse>;
        clear: () => import("./generated").CancelablePromise<import("./generated").CartResponse>;
    };
    catalog: {
        featured: (params?: {
            limit?: number;
            q?: string;
        }) => import("./generated").CancelablePromise<import("./generated").FeaturedCatalogResponse>;
    };
    public: {
        stores: (params?: {
            q?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PublicStoreListResponse>;
        nearbyStores: (params: {
            lat: number;
            lng: number;
            radiusKm?: number;
        }) => import("./generated").CancelablePromise<import("./generated").PublicStoreNearbyResponse>;
        products: (params?: {
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PublicProductListResponse>;
        services: (params?: {
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PublicServiceListResponse>;
        categories: (params?: {
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PublicCategoryListResponse>;
        catalog: () => import("./generated").CancelablePromise<import("./generated").MarketplaceCatalogResponse>;
    };
    categories: {
        list: (params?: {
            limit?: number;
            offset?: number;
            q?: string;
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").CategoryListResponse>;
        create: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Category>;
        update: (id: string, data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Category>;
        delete: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OkResponse>;
    };
    tags: {
        list: (params?: {
            limit?: number;
            offset?: number;
            q?: string;
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").TagListResponse>;
        create: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Tag>;
        generate: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").GeneratedTagsResponse>;
        delete: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OkResponse>;
    };
    stores: {
        list: () => import("./generated").CancelablePromise<import("./generated").StoreListResponse>;
        create: (data: any) => import("./generated").CancelablePromise<import("./generated").CreateStoreResponse>;
        me: () => import("./generated").CancelablePromise<import("./generated").StoresMeResponse>;
        getById: (id: string) => import("./generated").CancelablePromise<import("./generated").StoreDetailsResponse>;
        update: (id: string, data: {
            name?: string;
        }) => import("./generated").CancelablePromise<import("./generated").UpdateStoreResponse>;
        select: (id: string) => import("./generated").CancelablePromise<import("./generated").StoreSelectResponse>;
        setVisibility: (id: string, isPublic: boolean) => import("./generated").CancelablePromise<import("./generated").UpdateStoreVisibilityResponse>;
        archive: (id: string) => import("./generated").CancelablePromise<import("./generated").StoreDeleteResponse>;
    };
    products: {
        list: (customStoreId?: string, params?: {
            limit?: number;
            offset?: number;
            q?: string;
            category?: string;
            categoryId?: string;
            status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
            sort?: string;
        }) => import("./generated").CancelablePromise<import("./generated").ProductListResponse>;
        get: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").ProductDetail>;
        create: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").ProductDetail>;
        update: (id: string, data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").ProductDetail>;
        delete: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OkResponse>;
        publicGet: (id: string, storeId: string) => import("./generated").CancelablePromise<import("./generated").PublicProductResponse>;
    };
    productImages: {
        list: (productId: string, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            images: Array<import("./generated").ProductImage>;
        }>;
        presign: (productId: string, data: {
            filename: string;
            contentType?: "image/jpeg" | "image/png" | "image/webp" | "image/avif";
        }, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            uploadUrl: string;
            key: string;
            url: string;
        }>;
        create: (productId: string, data: {
            key: string;
            url: string;
            alt?: string | null;
            isPrimary?: boolean;
            position?: number;
            variantId?: string | null;
        }, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            image: import("./generated").ProductImage;
        }>;
        update: (productId: string, imageId: string, data: {
            url?: string;
            alt?: string | null;
            isPrimary?: boolean;
            position?: number;
            variantId?: string | null;
        }, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            image: import("./generated").ProductImage;
        }>;
        delete: (productId: string, imageId: string, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            imageId: string;
        }>;
    };
    serviceImages: {
        list: (serviceId: string, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            images: Array<import("./generated").ServiceImage>;
        }>;
        presign: (serviceId: string, data: {
            filename: string;
            contentType?: "image/jpeg" | "image/png" | "image/webp" | "image/avif";
        }, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            uploadUrl: string;
            key: string;
            url: string;
        }>;
        create: (serviceId: string, data: {
            key: string;
            url: string;
            alt?: string | null;
            isPrimary?: boolean;
            position?: number;
        }, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            image: import("./generated").ServiceImage;
        }>;
        update: (serviceId: string, imageId: string, data: {
            url?: string;
            alt?: string | null;
            isPrimary?: boolean;
            position?: number;
        }, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            image: import("./generated").ServiceImage;
        }>;
        delete: (serviceId: string, imageId: string, customStoreId?: string) => import("./generated").CancelablePromise<{
            ok: boolean;
            imageId: string;
        }>;
    };
    favorites: {
        list: (params?: {
            type?: "STORE" | "PRODUCT" | "SERVICE";
        }) => import("./generated").CancelablePromise<import("./generated").FavoritesResponse>;
        add: (data: {
            type: "STORE" | "PRODUCT" | "SERVICE";
            storeId?: string;
            productId?: string;
            serviceId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").FavoriteSingleResponse>;
        remove: (data: {
            type: "STORE" | "PRODUCT" | "SERVICE";
            storeId?: string;
            productId?: string;
            serviceId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").OkResponse>;
    };
    orders: {
        list: (params?: {
            limit?: number;
            status?: "PENDING" | "PAID" | "PROCESSING" | "READY_FOR_PICKUP" | "FULFILLED" | "CANCELLED" | "REFUNDED";
            paymentStatus?: "REQUIRES_ACTION" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "REFUNDED";
            fulfillmentType?: "STANDARD" | "PICKUP";
            customerId?: string;
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").OrderListResponse>;
        create: (data: CreateOrderRequest & {
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").OrderSingleResponse>;
        get: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OrderSingleResponse>;
        updateStatus: (id: string, data: UpdateOrderStatusRequest, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OrderSingleResponse>;
        cancel: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OrderSingleResponse>;
    };
    payments: {
        bookingCheckout: (data: {
            bookingId: string;
            successUrl?: string;
            cancelUrl?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PaymentCheckoutResponse>;
        checkout: (data: {
            orderId: string;
            successUrl?: string;
            cancelUrl?: string;
        }) => import("./generated").CancelablePromise<import("./generated").PaymentCheckoutResponse>;
        refund: (paymentId: string, data?: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").CreateRefundResponse>;
    };
    reviews: {
        list: (productId: string, params?: {
            limit?: number;
            offset?: number;
            storeId?: string;
        }) => import("./generated").CancelablePromise<import("./generated").ReviewListResponse>;
        create: (productId: string, data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Review>;
        flag: (productId: string, reviewId: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").FlagReviewResponse>;
    };
    services: {
        list: (customStoreId?: string, includeInactive?: boolean) => import("./generated").CancelablePromise<import("./generated").ServiceListResponse>;
        create: (data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Service>;
        update: (id: string, data: any, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").Service>;
        delete: (id: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").OkResponse>;
        getAvailability: (id: string, date: string, customStoreId?: string) => import("./generated").CancelablePromise<import("./generated").ServiceAvailabilityResponse>;
    };
};
export {};
