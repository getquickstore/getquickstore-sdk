"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingConnectService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class BillingConnectService {
    /**
     * Start Stripe Connect onboarding for a store
     * @returns StripeConnectStartResponse Stripe Connect onboarding link created
     * @throws ApiError
     */
    static postBillingStoresStripeConnectStart({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/billing/stores/{id}/stripe/connect/start',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Store not found`,
                500: `Billing service or Prisma is not configured`,
            },
        });
    }
    /**
     * Get Stripe Connect status for a store
     * @returns StripeConnectStatusResponse Stripe Connect status returned
     * @throws ApiError
     */
    static getBillingStoresStripeConnectStatus({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/billing/stores/{id}/stripe/connect/status',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Store not found`,
                500: `Billing service or Prisma is not configured`,
            },
        });
    }
    /**
     * Force sync Stripe Connect state for a store
     * @returns StripeConnectStatusResponse Stripe Connect state synced successfully
     * @throws ApiError
     */
    static postBillingStoresStripeConnectSync({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/billing/stores/{id}/stripe/connect/sync',
            path: {
                'id': id,
            },
            errors: {
                400: `Store is not connected to Stripe`,
                401: `Unauthorized`,
                404: `Store not found`,
                500: `Billing service or Prisma is not configured`,
            },
        });
    }
}
exports.BillingConnectService = BillingConnectService;
