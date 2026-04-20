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
    });
    return {
        auth: {
            login: (email, password) => AuthService_1.AuthService.postAuthLogin({
                requestBody: { email, password },
            }),
            register: (name, email, password) => AuthService_1.AuthService.postAuthRegister({
                requestBody: { name, email, password },
            }),
            me: () => withAuthRetry(() => AuthService_1.AuthService.getAuthMe()),
            refresh: () => AuthService_1.AuthService.postAuthRefresh(),
            logout: () => AuthService_1.AuthService.postAuthLogout({}),
        },
        billing: {
            current: () => withAuthRetry(() => BillingService_1.BillingService.getBillingCurrent({
                storeId: storeId || undefined,
            })),
            checkout: (data) => withAuthRetry(() => BillingService_1.BillingService.postBillingCheckout({
                requestBody: {
                    storeId: storeId,
                    successUrl: data?.successUrl ?? null,
                    cancelUrl: data?.cancelUrl ?? null,
                },
            })),
            portal: (data) => withAuthRetry(() => BillingService_1.BillingService.postBillingPortal({
                requestBody: {
                    storeId: storeId,
                    returnUrl: data?.returnUrl ?? null,
                },
            })),
            cancel: () => withAuthRetry(() => BillingService_1.BillingService.postBillingCancel({
                requestBody: {
                    storeId: storeId,
                },
            })),
        },
        stripeConnect: {
            status: () => withAuthRetry(() => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({
                id: storeId,
            })),
            start: (data) => withAuthRetry(() => BillingService_1.BillingService.postBillingStoresStripeConnectStart({
                id: storeId,
                requestBody: {
                    returnUrl: data.returnUrl,
                    refreshUrl: data.refreshUrl,
                },
            })),
            sync: () => withAuthRetry(() => BillingConnectService_1.BillingConnectService.postBillingStoresStripeConnectSync({
                id: storeId,
            })),
        },
        stores: {
            create: (data) => withAuthRetry(() => StoresService_1.StoresService.postStores({
                requestBody: data,
            })),
            me: () => withAuthRetry(() => StoresService_1.StoresService.getStoresMe()),
        },
        categories: {
            list: () => withAuthRetry(() => CategoriesService_1.CategoriesService.getCategories({
                xStoreId: storeId,
            })),
            create: (data) => withAuthRetry(() => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: storeId,
            })),
        },
        products: {
            list: () => withAuthRetry(() => ProductsService_1.ProductsService.getProducts({
                xStoreId: storeId,
            })),
            get: (id) => withAuthRetry(() => ProductsService_1.ProductsService.getProducts1({
                id,
                xStoreId: storeId,
            })),
            create: (data) => withAuthRetry(() => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: storeId,
            })),
        },
        orders: {
            list: () => withAuthRetry(() => OrdersService_1.OrdersService.getOrders({
                xStoreId: storeId,
            })),
            get: (id) => withAuthRetry(() => OrdersService_1.OrdersService.getOrders1({
                id,
                xStoreId: storeId,
            })),
            create: (data) => withAuthRetry(() => OrdersService_1.OrdersService.postOrders({
                requestBody: data,
                xStoreId: storeId,
            })),
        },
    };
}
