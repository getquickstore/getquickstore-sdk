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
const ProductImagesService_1 = require("./generated/services/ProductImagesService");
const ProductsService_1 = require("./generated/services/ProductsService");
const ReviewsService_1 = require("./generated/services/ReviewsService");
const StoresService_1 = require("./generated/services/StoresService");
const ServicesService_1 = require("./generated/services/ServicesService");
let refreshPromise = null;
function isAuthError(error) {
    return error?.status === 401 || error?.status === 403;
}
function shouldSkipRefresh(error) {
    const url = String(error?.request?.url || error?.url || "").toLowerCase();
    return (url.includes("/auth/login") ||
        url.includes("/auth/logout") ||
        url.includes("/auth/refresh"));
}
async function refreshSession() {
    if (!refreshPromise) {
        refreshPromise = AuthService_1.AuthService.postAuthRefresh()
            .then(() => undefined)
            .finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}
async function withAuthRetry(fn) {
    try {
        return await fn();
    }
    catch (error) {
        if (!isAuthError(error) || shouldSkipRefresh(error)) {
            throw error;
        }
        await refreshSession();
        return await fn();
    }
}
function createClient({ baseUrl, token, storeId }) {
    OpenAPI_1.OpenAPI.BASE = baseUrl;
    OpenAPI_1.OpenAPI.WITH_CREDENTIALS = true;
    OpenAPI_1.OpenAPI.CREDENTIALS = "include";
    OpenAPI_1.OpenAPI.HEADERS = async () => ({
        Authorization: token ? `Bearer ${token}` : undefined,
        "x-store-id": storeId || undefined,
    });
    const requireStoreId = (value) => {
        const resolved = value || storeId;
        if (!resolved) {
            throw new Error("storeId is required in client");
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
            me: () => withAuthRetry(() => AuthService_1.AuthService.getAuthMe()),
            refresh: () => AuthService_1.AuthService.postAuthRefresh(),
            logout: () => AuthService_1.AuthService.postAuthLogout({}),
            createWebHandoff: (data) => withAuthRetry(() => AuthService_1.AuthService.postAuthWebHandoff({
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
            getTwoFactorStatus: () => withAuthRetry(() => AuthService_1.AuthService.getAuth2Fa()),
            getSessions: () => withAuthRetry(() => AuthService_1.AuthService.getAuthSessions()),
            changePassword: (data) => withAuthRetry(() => AuthService_1.AuthService.postAuthPasswordChange({
                requestBody: data,
            })),
            confirmEmailVerification: (token) => AuthService_1.AuthService.postAuthEmailVerifyConfirm({
                requestBody: { token },
            }),
            requestEmailVerification: (email) => withAuthRetry(() => AuthService_1.AuthService.postAuthEmailVerifyRequest({
                requestBody: { email },
            })),
            requestEmailChange: (newEmail) => withAuthRetry(() => AuthService_1.AuthService.postAuthEmailChangeRequest({
                requestBody: { newEmail },
            })),
            confirmEmailChange: (token) => AuthService_1.AuthService.postAuthEmailChangeConfirm({
                requestBody: { token },
            }),
            startReAuth: (action) => withAuthRetry(() => AuthService_1.AuthService.postAuthReAuthStart({
                requestBody: { action },
            })),
            verifyReAuth: (data) => withAuthRetry(() => AuthService_1.AuthService.postAuthReAuthVerify({
                requestBody: data,
            })),
            startTwoFactorSetup: () => withAuthRetry(() => AuthService_1.AuthService.postAuth2FaSetup()),
            confirmTwoFactorSetup: (code) => withAuthRetry(() => AuthService_1.AuthService.postAuth2FaConfirm({
                requestBody: { code },
            })),
            disableTwoFactor: (data) => withAuthRetry(() => AuthService_1.AuthService.postAuth2FaDisable({
                requestBody: data,
            })),
            regenerateRecoveryCodes: (code) => withAuthRetry(() => AuthService_1.AuthService.postAuth2FaRecoveryCodesRegenerate({
                requestBody: { code },
            })),
            revokeSession: (data) => withAuthRetry(() => AuthService_1.AuthService.postAuthSessionsRevoke({
                requestBody: data,
            })),
        },
        availability: {
            upsert: (data) => withAuthRetry(() => AvailabilityService_1.AvailabilityService.postAvailability({
                requestBody: data,
            })),
        },
        billing: {
            current: () => withAuthRetry(() => BillingService_1.BillingService.getBillingCurrent({
                xStoreId: storeId || undefined,
                storeId: storeId || undefined,
            })),
            storeCurrent: (id) => withAuthRetry(() => BillingService_1.BillingService.getBillingStoresCurrent({ id })),
            checkout: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withAuthRetry(() => BillingService_1.BillingService.postBillingCheckout({
                    requestBody: {
                        storeId: resolvedStoreId,
                        ...(data.successUrl ? { successUrl: data.successUrl } : {}),
                        ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
                    },
                }));
            },
            portal: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withAuthRetry(() => BillingService_1.BillingService.postBillingPortal({
                    requestBody: {
                        storeId: resolvedStoreId,
                        ...(data.returnUrl ? { returnUrl: data.returnUrl } : {}),
                    },
                }));
            },
            cancel: (data) => {
                const resolvedStoreId = requireStoreId(data.storeId);
                return withAuthRetry(() => BillingService_1.BillingService.postBillingCancel({
                    requestBody: {
                        storeId: resolvedStoreId,
                    },
                }));
            },
        },
        stripeConnect: {
            status: () => withAuthRetry(() => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({
                id: requireStoreId(),
            })),
            disconnect: (id) => withAuthRetry(() => BillingConnectService_1.BillingConnectService.postBillingStoresStripeDisconnect({ id })),
            statusByStore: (id) => withAuthRetry(() => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({ id })),
            start: (data) => withAuthRetry(() => BillingService_1.BillingService.postBillingStoresStripeConnectStart({
                id: requireStoreId(),
                requestBody: {
                    returnUrl: data.returnUrl,
                    refreshUrl: data.refreshUrl,
                },
            })),
            sync: () => withAuthRetry(() => BillingConnectService_1.BillingConnectService.postBillingStoresStripeConnectSync({
                id: requireStoreId(),
            })),
        },
        bookings: {
            list: (params) => withAuthRetry(() => BookingsService_1.BookingsService.getBookings({
                xStoreId: params?.storeId || storeId,
                status: params?.status,
                serviceId: params?.serviceId,
                dateFrom: params?.dateFrom,
                dateTo: params?.dateTo,
            })),
            create: (data, customStoreId) => withAuthRetry(() => BookingsService_1.BookingsService.postBookings({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            get: (id, customStoreId) => withAuthRetry(() => BookingsService_1.BookingsService.getBookings1({
                id,
                xStoreId: customStoreId || storeId,
            })),
            update: (id, data, customStoreId) => withAuthRetry(() => BookingsService_1.BookingsService.patchBookings({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            cancel: (id, customStoreId) => withAuthRetry(() => BookingsService_1.BookingsService.postBookingsCancel({
                id,
                xStoreId: customStoreId || storeId,
            })),
        },
        calendar: {
            getDay: (date) => withAuthRetry(() => CalendarService_1.CalendarService.getCalendarDay({ date })),
        },
        cart: {
            get: (customStoreId) => withAuthRetry(() => CartService_1.CartService.getCart({
                xStoreId: customStoreId || storeId,
            })),
            add: (data, customStoreId) => withAuthRetry(() => CartService_1.CartService.postCartAdd({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            setQty: (data, customStoreId) => withAuthRetry(() => CartService_1.CartService.postCartSetQty({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            remove: (data, customStoreId) => withAuthRetry(() => CartService_1.CartService.postCartRemove({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            clear: (customStoreId) => withAuthRetry(() => CartService_1.CartService.postCartClear({
                xStoreId: customStoreId || storeId,
            })),
        },
        categories: {
            list: (params) => withAuthRetry(() => CategoriesService_1.CategoriesService.getCategories({
                xStoreId: params?.storeId || storeId,
                limit: params?.limit,
                offset: params?.offset,
                q: params?.q,
            })),
            create: (data, customStoreId) => withAuthRetry(() => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            update: (id, data, customStoreId) => withAuthRetry(() => CategoriesService_1.CategoriesService.patchCategories({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            delete: (id, customStoreId) => withAuthRetry(() => CategoriesService_1.CategoriesService.deleteCategories({
                id,
                xStoreId: customStoreId || storeId,
            })),
        },
        stores: {
            list: () => withAuthRetry(() => StoresService_1.StoresService.getStores()),
            create: (data) => withAuthRetry(() => StoresService_1.StoresService.postStores({
                requestBody: data,
            })),
            me: () => withAuthRetry(() => StoresService_1.StoresService.getStoresMe()),
            getById: (id) => withAuthRetry(() => StoresService_1.StoresService.getStores1({ id })),
            update: (id, data) => withAuthRetry(() => StoresService_1.StoresService.patchStores({
                id,
                requestBody: data,
            })),
            select: (id) => withAuthRetry(() => StoresService_1.StoresService.postStoresSelect({ id })),
            setVisibility: (id, isPublic) => withAuthRetry(() => StoresService_1.StoresService.patchStoresVisibility({
                id,
                requestBody: { isPublic },
            })),
            archive: (id) => withAuthRetry(() => StoresService_1.StoresService.deleteStores({ id })),
            getPublic: (params) => StoresService_1.StoresService.getStoresPublic({
                q: params?.q,
            }),
            getPublicBySlug: (slug) => StoresService_1.StoresService.getStoresPublic1({ slug }),
        },
        products: {
            list: (customStoreId) => withAuthRetry(() => ProductsService_1.ProductsService.getProducts({
                xStoreId: customStoreId || storeId,
            })),
            get: (id, customStoreId) => withAuthRetry(() => ProductsService_1.ProductsService.getProducts1({
                id,
                xStoreId: customStoreId || storeId,
            })),
            create: (data, customStoreId) => withAuthRetry(() => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            update: (id, data, customStoreId) => withAuthRetry(() => ProductsService_1.ProductsService.patchProducts({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
        },
        orders: {
            list: (params) => withAuthRetry(() => OrdersService_1.OrdersService.getOrders({
                xStoreId: params?.storeId || requireStoreId(),
                limit: params?.limit,
                status: params?.status,
                paymentStatus: params?.paymentStatus,
                customerId: params?.customerId,
                fulfillmentType: params?.fulfillmentType,
            })),
            create: (data, customStoreId) => withAuthRetry(() => OrdersService_1.OrdersService.postOrders({
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            get: (id, customStoreId) => withAuthRetry(() => OrdersService_1.OrdersService.getOrders1({
                id,
                xStoreId: customStoreId || requireStoreId(),
            })),
            updateStatus: (id, data, customStoreId) => withAuthRetry(() => OrdersService_1.OrdersService.patchOrdersStatus({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            cancel: (id, customStoreId) => withAuthRetry(() => OrdersService_1.OrdersService.postOrdersCancel({
                id,
                xStoreId: customStoreId || requireStoreId(),
            })),
            pay: (id, customStoreId) => withAuthRetry(() => OrdersService_1.OrdersService.postOrdersPay({
                id,
                xStoreId: customStoreId || requireStoreId(),
            })),
        },
        payments: {
            checkout: (data, customStoreId) => withAuthRetry(() => PaymentsService_1.PaymentsService.postPaymentsCheckout({
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            refund: (paymentId, data, customStoreId) => withAuthRetry(() => PaymentsService_1.PaymentsService.postPaymentsRefund({
                paymentId,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
        },
        productImages: {
            list: (productId, customStoreId) => withAuthRetry(() => ProductImagesService_1.ProductImagesService.getProductsImages({
                productId,
                xStoreId: customStoreId || storeId,
            })),
            create: (productId, data, customStoreId) => withAuthRetry(() => ProductImagesService_1.ProductImagesService.postProductsImages({
                productId,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            presign: (productId, data, customStoreId) => withAuthRetry(() => ProductImagesService_1.ProductImagesService.postProductsImagesPresign({
                productId,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            update: (productId, imageId, data, customStoreId) => withAuthRetry(() => ProductImagesService_1.ProductImagesService.patchProductsImages({
                productId,
                imageId,
                requestBody: data,
                xStoreId: customStoreId || storeId,
            })),
            delete: (productId, imageId, customStoreId) => withAuthRetry(() => ProductImagesService_1.ProductImagesService.deleteProductsImages({
                productId,
                imageId,
                xStoreId: customStoreId || storeId,
            })),
        },
        reviews: {
            list: (productId, params) => withAuthRetry(() => ReviewsService_1.ReviewsService.getProductsReviews({
                id: productId,
                xStoreId: params?.storeId || requireStoreId(),
                limit: params?.limit,
                offset: params?.offset,
            })),
            create: (productId, data, customStoreId) => withAuthRetry(() => ReviewsService_1.ReviewsService.postProductsReviews({
                id: productId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            flag: (productId, reviewId, customStoreId) => withAuthRetry(() => ReviewsService_1.ReviewsService.postProductsReviewsFlag({
                id: productId,
                rid: reviewId,
                xStoreId: customStoreId || requireStoreId(),
            })),
        },
        services: {
            list: (customStoreId, includeInactive) => withAuthRetry(() => ServicesService_1.ServicesService.getServices({
                xStoreId: customStoreId || requireStoreId(),
                includeInactive,
            })),
            create: (data, customStoreId) => withAuthRetry(() => ServicesService_1.ServicesService.postServices({
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            })),
            getAvailability: (id, date, customStoreId) => withAuthRetry(() => ServicesService_1.ServicesService.getServicesAvailability({
                xStoreId: customStoreId || requireStoreId(),
                id,
                date,
            })),
        },
    };
}
