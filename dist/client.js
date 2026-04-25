"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
const OpenAPI_1 = require("./generated/core/OpenAPI");
const AuthService_1 = require("./generated/services/AuthService");
const AvailabilityService_1 = require("./generated/services/AvailabilityService");
const BillingService_1 = require("./generated/services/BillingService");
const BillingConnectService_1 = require("./generated/services/BillingConnectService");
const BookingsService_1 = require("./generated/services/BookingsService");
const CalendarService_1 = require("./generated/services/CalendarService");
const CartService_1 = require("./generated/services/CartService");
const CategoriesService_1 = require("./generated/services/CategoriesService");
const OrdersService_1 = require("./generated/services/OrdersService");
const PaymentsService_1 = require("./generated/services/PaymentsService");
const ProductsService_1 = require("./generated/services/ProductsService");
const ReviewsService_1 = require("./generated/services/ReviewsService");
const StoresService_1 = require("./generated/services/StoresService");
const ServicesService_1 = require("./generated/services/ServicesService");
let refreshPromise = null;
let activeAccessToken;
function maskToken(token) {
    if (!token)
        return null;
    return `${token.slice(0, 12)}...${token.slice(-8)}`;
}
let sdkRequestSeq = 0;
function nextSdkTrace(label) {
    sdkRequestSeq += 1;
    return `${label}#${sdkRequestSeq}`;
}
function isAuthError(error) {
    return error?.status === 401 || error?.status === 403;
}
function shouldSkipRefresh(error) {
    const url = String(error?.request?.url || error?.url || '').toLowerCase();
    return (url.includes('/auth/login') ||
        url.includes('/auth/logout') ||
        url.includes('/auth/refresh'));
}
function createClient({ baseUrl, token, storeId }) {
    if (token) {
        activeAccessToken = token;
    }
    OpenAPI_1.OpenAPI.BASE = baseUrl;
    OpenAPI_1.OpenAPI.WITH_CREDENTIALS = true;
    OpenAPI_1.OpenAPI.CREDENTIALS = 'include';
    const applyHeaders = () => {
        OpenAPI_1.OpenAPI.HEADERS = async () => {
            const headers = {};
            if (activeAccessToken) {
                headers.Authorization = `Bearer ${activeAccessToken}`;
            }
            if (storeId) {
                headers['x-store-id'] = storeId;
            }
            console.log('[sdk:headers] OpenAPI.HEADERS resolved', {
                activeAccessToken: maskToken(activeAccessToken),
                createClientStoreId: storeId,
                hasAuthorization: !!headers.Authorization,
                authorizationPrefix: headers.Authorization?.slice(0, 24) || null,
                xStoreId: headers['x-store-id'] || null,
            });
            return headers;
        };
    };
    applyHeaders();
    const refreshSessionForClient = async () => {
        console.log('[sdk] refreshSession start');
        if (!refreshPromise) {
            refreshPromise = AuthService_1.AuthService.postAuthRefresh({
                requestBody: {},
            })
                .then((res) => {
                console.log('[sdk] refreshSession ok', {
                    ok: res?.ok,
                    hasAccessToken: !!res?.accessToken,
                });
                if (res?.accessToken) {
                    activeAccessToken = res.accessToken;
                    applyHeaders();
                }
                return res;
            })
                .finally(() => {
                refreshPromise = null;
            });
        }
        const res = await refreshPromise;
        if (res?.accessToken) {
            activeAccessToken = res.accessToken;
            applyHeaders();
        }
        return res;
    };
    const withClientAuthRetry = async (fn) => {
        try {
            return await fn();
        }
        catch (error) {
            console.log('[sdk] request failed', {
                status: error?.status,
                url: error?.request?.url || error?.url,
            });
            if (!isAuthError(error) || shouldSkipRefresh(error)) {
                throw error;
            }
            await refreshSessionForClient();
            console.log('[sdk] token refreshed; caller should retry', {
                hasActiveAccessToken: !!activeAccessToken,
                tokenPrefix: activeAccessToken ? activeAccessToken.slice(0, 12) : null,
            });
            throw error;
        }
    };
    const requireStoreId = (value) => {
        const resolved = value || storeId;
        if (!resolved) {
            throw new Error('storeId is required in client');
        }
        return resolved;
    };
    return {
        auth: {
            login: (email, password) => AuthService_1.AuthService.postAuthLogin({
                requestBody: { email, password },
            }),
            verifyLoginTwoFactor: (data) => AuthService_1.AuthService.postAuthLogin2FaVerify({
                requestBody: {
                    challengeId: data.challengeId,
                    code: data.code,
                    trustDevice: data.trustDevice,
                    deviceFingerprint: data.deviceFingerprint,
                },
            }),
            resendLoginTwoFactor: (challengeId) => AuthService_1.AuthService.postAuthLogin2FaResend({
                requestBody: { challengeId },
            }),
            register: (name, email, password) => AuthService_1.AuthService.postAuthRegister({
                requestBody: { name, email, password },
            }),
            me: () => withClientAuthRetry(() => AuthService_1.AuthService.getAuthMe()),
            refresh: (refreshToken) => AuthService_1.AuthService.postAuthRefresh({
                requestBody: refreshToken ? { refreshToken } : {},
            }),
            logout: (data) => AuthService_1.AuthService.postAuthLogout({
                requestBody: data || {},
            }),
            createWebHandoff: (data) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthWebHandoff({
                requestBody: {
                    ...(data?.nextPath ? { nextPath: data.nextPath } : {}),
                },
            })),
            magicLinkRequest: (email) => AuthService_1.AuthService.postAuthMagicLinkRequest({
                requestBody: { email },
            }),
            magicLinkVerifyByToken: (token) => AuthService_1.AuthService.getAuthMagicLinkVerify({ token }),
            magicLinkVerifyByCode: (data) => AuthService_1.AuthService.postAuthMagicLinkVerify({
                requestBody: data,
            }),
            forgotPassword: (email) => AuthService_1.AuthService.postAuthForgotPassword({
                requestBody: { email },
            }),
            resetPassword: (data) => AuthService_1.AuthService.postAuthResetPassword({
                requestBody: data,
            }),
            requestPasswordReset: (email) => AuthService_1.AuthService.postAuthPasswordResetRequest({
                requestBody: { email },
            }),
            confirmPasswordReset: (data) => AuthService_1.AuthService.postAuthPasswordResetConfirm({
                requestBody: data,
            }),
            getTwoFactorStatus: () => withClientAuthRetry(() => AuthService_1.AuthService.getAuth2Fa()),
            getSessions: () => withClientAuthRetry(() => AuthService_1.AuthService.getAuthSessions()),
            changePassword: (data) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthPasswordChange({
                requestBody: data,
            })),
            confirmEmailVerification: (token) => AuthService_1.AuthService.postAuthEmailVerifyConfirm({
                requestBody: { token },
            }),
            requestEmailVerification: (email) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthEmailVerifyRequest({
                requestBody: { email },
            })),
            requestEmailChange: (newEmail) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthEmailChangeRequest({
                requestBody: { newEmail },
            })),
            confirmEmailChange: (token) => AuthService_1.AuthService.postAuthEmailChangeConfirm({
                requestBody: { token },
            }),
            startReAuth: (action) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthReAuthStart({
                requestBody: { action },
            })),
            verifyReAuth: (data) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthReAuthVerify({
                requestBody: data,
            })),
            startTwoFactorSetup: () => withClientAuthRetry(() => AuthService_1.AuthService.postAuth2FaSetup()),
            confirmTwoFactorSetup: (code) => withClientAuthRetry(() => AuthService_1.AuthService.postAuth2FaConfirm({
                requestBody: { code },
            })),
            disableTwoFactor: (data) => withClientAuthRetry(() => AuthService_1.AuthService.postAuth2FaDisable({
                requestBody: data,
            })),
            regenerateRecoveryCodes: (code) => withClientAuthRetry(() => AuthService_1.AuthService.postAuth2FaRecoveryCodesRegenerate({
                requestBody: { code },
            })),
            revokeSession: (data) => withClientAuthRetry(() => AuthService_1.AuthService.postAuthSessionsRevoke({
                requestBody: data,
            })),
        },
        availability: {
            upsert: (data) => withClientAuthRetry(() => AvailabilityService_1.AvailabilityService.postAvailability({
                requestBody: data,
            })),
        },
        billing: {
            current: () => withClientAuthRetry(() => BillingService_1.BillingService.getBillingCurrent({
                xStoreId: storeId || undefined,
                storeId: storeId || undefined,
            })),
            storeCurrent: (id) => withClientAuthRetry(() => BillingService_1.BillingService.getBillingStoresCurrent({ id })),
            checkout: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withClientAuthRetry(() => BillingService_1.BillingService.postBillingCheckout({
                    requestBody: {
                        storeId: resolvedStoreId,
                        ...(data.successUrl ? { successUrl: data.successUrl } : {}),
                        ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
                    },
                }));
            },
            portal: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withClientAuthRetry(() => BillingService_1.BillingService.postBillingPortal({
                    requestBody: {
                        storeId: resolvedStoreId,
                        ...(data.returnUrl ? { returnUrl: data.returnUrl } : {}),
                    },
                }));
            },
            cancel: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withClientAuthRetry(() => BillingService_1.BillingService.postBillingCancel({
                    requestBody: {
                        storeId: resolvedStoreId,
                    },
                }));
            },
        },
        stripeConnect: {
            status: () => withClientAuthRetry(() => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({
                id: requireStoreId(),
            })),
            disconnect: (id) => withClientAuthRetry(() => BillingConnectService_1.BillingConnectService.postBillingStoresStripeDisconnect({ id })),
            statusByStore: (id) => withClientAuthRetry(() => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({ id })),
            start: (data) => withClientAuthRetry(() => BillingService_1.BillingService.postBillingStoresStripeConnectStart({
                id: requireStoreId(),
                requestBody: {
                    returnUrl: data.returnUrl,
                    refreshUrl: data.refreshUrl,
                },
            })),
            sync: () => withClientAuthRetry(() => BillingConnectService_1.BillingConnectService.postBillingStoresStripeConnectSync({
                id: requireStoreId(),
            })),
        },
        bookings: {
            list: (params) => withClientAuthRetry(() => BookingsService_1.BookingsService.getBookings({
                xStoreId: params?.storeId || storeId,
                status: params?.status,
                serviceId: params?.serviceId,
                dateFrom: params?.dateFrom,
                dateTo: params?.dateTo,
            })),
            create: (data, customStoreId) => withClientAuthRetry(() => BookingsService_1.BookingsService.postBookings({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            get: (id, customStoreId) => withClientAuthRetry(() => BookingsService_1.BookingsService.getBookings1({
                id,
                xStoreId: customStoreId || storeId,
            })),
            update: (id, data, customStoreId) => withClientAuthRetry(() => BookingsService_1.BookingsService.patchBookings({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            cancel: (id, customStoreId) => withClientAuthRetry(() => BookingsService_1.BookingsService.postBookingsCancel({
                id,
                xStoreId: customStoreId || storeId,
            })),
        },
        calendar: {
            getDay: (date) => withClientAuthRetry(() => CalendarService_1.CalendarService.getCalendarDay({ date })),
        },
        cart: {
            get: () => withClientAuthRetry(() => CartService_1.CartService.getCart()),
            add: (data) => withClientAuthRetry(() => CartService_1.CartService.postCartAdd({
                requestBody: data,
            })),
            setQty: (data) => withClientAuthRetry(() => CartService_1.CartService.postCartSetQty({
                requestBody: data,
            })),
            remove: (data) => withClientAuthRetry(() => CartService_1.CartService.postCartRemove({
                requestBody: data,
            })),
            clear: () => withClientAuthRetry(() => CartService_1.CartService.postCartClear()),
        },
        categories: {
            list: (params) => withClientAuthRetry(() => CategoriesService_1.CategoriesService.getCategories({
                xStoreId: params?.storeId || storeId,
                limit: params?.limit,
                offset: params?.offset,
                q: params?.q,
            })),
            create: (data, customStoreId) => withClientAuthRetry(() => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            update: (id, data, customStoreId) => withClientAuthRetry(() => CategoriesService_1.CategoriesService.patchCategories({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            delete: (id, customStoreId) => withClientAuthRetry(() => CategoriesService_1.CategoriesService.deleteCategories({
                id,
                xStoreId: customStoreId || storeId,
            })),
        },
        stores: {
            list: () => withClientAuthRetry(() => StoresService_1.StoresService.getStores()),
            create: (data) => withClientAuthRetry(() => StoresService_1.StoresService.postStores({
                requestBody: data,
            })),
            me: () => withClientAuthRetry(() => StoresService_1.StoresService.getStoresMe()),
            getById: (id) => withClientAuthRetry(() => StoresService_1.StoresService.getStores1({ id })),
            update: (id, data) => withClientAuthRetry(() => StoresService_1.StoresService.patchStores({
                id,
                requestBody: data,
            })),
            select: (id) => withClientAuthRetry(() => StoresService_1.StoresService.postStoresSelect({ id })),
            setVisibility: (id, isPublic) => withClientAuthRetry(() => StoresService_1.StoresService.patchStoresVisibility({
                id,
                requestBody: { isPublic },
            })),
            archive: (id) => withClientAuthRetry(() => StoresService_1.StoresService.deleteStores({ id })),
            getPublic: (params) => StoresService_1.StoresService.getStoresPublic({
                q: params?.q,
            }),
            getPublicBySlug: (slug) => StoresService_1.StoresService.getStoresPublic1({ slug }),
        },
        products: {
            list: (customStoreId) => withClientAuthRetry(() => ProductsService_1.ProductsService.getProducts({
                xStoreId: customStoreId || storeId,
            })),
            get: (id, customStoreId) => withClientAuthRetry(() => ProductsService_1.ProductsService.getProducts1({
                id,
                xStoreId: customStoreId || storeId,
            })),
            create: (data, customStoreId) => withClientAuthRetry(() => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            update: (id, data, customStoreId) => withClientAuthRetry(() => ProductsService_1.ProductsService.patchProducts({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
        },
        orders: {
            list: (params) => withClientAuthRetry(() => OrdersService_1.OrdersService.getOrders({
                xStoreId: params?.storeId || undefined,
                limit: params?.limit,
                status: params?.status,
                paymentStatus: params?.paymentStatus,
                customerId: params?.customerId,
                fulfillmentType: params?.fulfillmentType,
            })),
            create: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withClientAuthRetry(() => OrdersService_1.OrdersService.postOrders({
                    requestBody: {
                        ...data,
                        storeId: resolvedStoreId,
                    },
                }));
            },
            get: (id, customStoreId) => withClientAuthRetry(() => OrdersService_1.OrdersService.getOrders1({
                id,
                xStoreId: customStoreId || undefined,
            })),
            updateStatus: (id, data, customStoreId) => withClientAuthRetry(() => OrdersService_1.OrdersService.patchOrdersStatus({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            cancel: (id, customStoreId) => withClientAuthRetry(() => OrdersService_1.OrdersService.postOrdersCancel({
                id,
                xStoreId: customStoreId || undefined,
            })),
        },
        payments: {
            checkout: (data) => withClientAuthRetry(() => PaymentsService_1.PaymentsService.postPaymentsCheckout({
                requestBody: {
                    orderId: data.orderId,
                    ...(data.successUrl ? { successUrl: data.successUrl } : {}),
                    ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
                },
            })),
            refund: (paymentId, data, customStoreId) => withClientAuthRetry(() => PaymentsService_1.PaymentsService.postPaymentsRefund({
                paymentId,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
        },
        reviews: {
            list: (productId, params) => withClientAuthRetry(() => ReviewsService_1.ReviewsService.getProductsReviews({
                id: productId,
                xStoreId: params?.storeId || requireStoreId(),
                limit: params?.limit,
                offset: params?.offset,
            })),
            create: (productId, data, customStoreId) => withClientAuthRetry(() => ReviewsService_1.ReviewsService.postProductsReviews({
                id: productId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            flag: (productId, reviewId, customStoreId) => withClientAuthRetry(() => ReviewsService_1.ReviewsService.postProductsReviewsFlag({
                id: productId,
                rid: reviewId,
                xStoreId: customStoreId || requireStoreId(),
            })),
        },
        services: {
            list: (customStoreId, includeInactive) => withClientAuthRetry(() => ServicesService_1.ServicesService.getServices({
                xStoreId: customStoreId || requireStoreId(),
                includeInactive,
            })),
            create: (data, customStoreId) => withClientAuthRetry(() => ServicesService_1.ServicesService.postServices({
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            getAvailability: (id, date, customStoreId) => withClientAuthRetry(() => ServicesService_1.ServicesService.getServicesAvailability({
                xStoreId: customStoreId || requireStoreId(),
                id,
                date,
            })),
        },
    };
}
