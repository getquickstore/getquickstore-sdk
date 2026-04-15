"use strict";
// src\client.ts
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
function createClient({ baseUrl, token, storeId }) {
    OpenAPI_1.OpenAPI.BASE = baseUrl;
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
            me: () => AuthService_1.AuthService.getAuthMe(),
        },
        billing: {
            current: () => BillingService_1.BillingService.getBillingCurrent({
                storeId: storeId || undefined,
            }),
            checkout: (data) => BillingService_1.BillingService.postBillingCheckout({
                requestBody: {
                    storeId: storeId,
                    successUrl: data?.successUrl ?? null,
                    cancelUrl: data?.cancelUrl ?? null,
                },
            }),
            portal: (data) => BillingService_1.BillingService.postBillingPortal({
                requestBody: {
                    storeId: storeId,
                    returnUrl: data?.returnUrl ?? null,
                },
            }),
            cancel: () => BillingService_1.BillingService.postBillingCancel({
                requestBody: {
                    storeId: storeId,
                },
            }),
        },
        stripeConnect: {
            status: () => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({
                id: storeId,
            }),
            start: () => BillingConnectService_1.BillingConnectService.postBillingStoresStripeConnectStart({
                id: storeId,
            }),
            sync: () => BillingConnectService_1.BillingConnectService.postBillingStoresStripeConnectSync({
                id: storeId,
            }),
        },
        stores: {
            create: (data) => StoresService_1.StoresService.postStores({
                requestBody: data,
            }),
            me: () => StoresService_1.StoresService.getStoresMe(),
        },
        categories: {
            list: () => CategoriesService_1.CategoriesService.getCategories({ xStoreId: storeId }),
            create: (data) => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: storeId,
            }),
        },
        products: {
            list: () => ProductsService_1.ProductsService.getProducts({ xStoreId: storeId }),
            get: (id) => ProductsService_1.ProductsService.getProducts1({ id, xStoreId: storeId }),
            create: (data) => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: storeId,
            }),
        },
        orders: {
            list: () => OrdersService_1.OrdersService.getOrders({ xStoreId: storeId }),
            get: (id) => OrdersService_1.OrdersService.getOrders1({ id, xStoreId: storeId }),
            create: (data) => OrdersService_1.OrdersService.postOrders({
                requestBody: data,
                xStoreId: storeId,
            }),
        },
    };
}
