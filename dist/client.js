"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
const OpenAPI_1 = require("./generated/core/OpenAPI");
const AuthService_1 = require("./generated/services/AuthService");
const BillingService_1 = require("./generated/services/BillingService");
const BillingConnectService_1 = require("./generated/services/BillingConnectService");
const StoresService_1 = require("./generated/services/StoresService");
const ProductsService_1 = require("./generated/services/ProductsService");
const OrdersService_1 = require("./generated/services/OrdersService");
const CategoriesService_1 = require("./generated/services/CategoriesService");
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
            register: (name, email, password) => AuthService_1.AuthService.postAuthRegister({
                requestBody: { name, email, password },
            }),
            me: () => withAuthRetry(() => AuthService_1.AuthService.getAuthMe()),
            refresh: () => AuthService_1.AuthService.postAuthRefresh(),
            logout: () => AuthService_1.AuthService.postAuthLogout({}),
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
        },
        categories: {
            list: () => withAuthRetry(() => CategoriesService_1.CategoriesService.getCategories({
                xStoreId: requireStoreId(),
            })),
            create: (data) => withAuthRetry(() => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: requireStoreId(),
            })),
        },
        products: {
            list: () => withAuthRetry(() => ProductsService_1.ProductsService.getProducts({
                xStoreId: requireStoreId(),
            })),
            get: (id) => withAuthRetry(() => ProductsService_1.ProductsService.getProducts1({
                id,
                xStoreId: requireStoreId(),
            })),
            create: (data) => withAuthRetry(() => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: requireStoreId(),
            })),
        },
        orders: {
            list: () => withAuthRetry(() => OrdersService_1.OrdersService.getOrders({
                xStoreId: requireStoreId(),
            })),
            get: (id) => withAuthRetry(() => OrdersService_1.OrdersService.getOrders1({
                id,
                xStoreId: requireStoreId(),
            })),
            create: (data) => withAuthRetry(() => OrdersService_1.OrdersService.postOrders({
                requestBody: data,
                xStoreId: requireStoreId(),
            })),
        },
    };
}
