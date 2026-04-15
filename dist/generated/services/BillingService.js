"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class BillingService {
    /**
     * List available billing plans
     * @returns BillingPlansResponse Available plans
     * @throws ApiError
     */
    static getBillingPlans() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/billing/plans',
        });
    }
    /**
     * Get current billing state for the user's current or latest owned store
     * @returns BillingCurrentResponse Current billing state
     * @throws ApiError
     */
    static getBillingCurrent({ xStoreId, storeId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/billing/current',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'storeId': storeId,
            },
            errors: {
                400: `Missing storeId`,
                401: `Missing or invalid token`,
                404: `Store not found`,
            },
        });
    }
    /**
     * Get current billing state for a specific store
     * @returns BillingCurrentResponse Current billing state
     * @throws ApiError
     */
    static getBillingStoresCurrent({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/billing/stores/{id}/current',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing or invalid token`,
                404: `Store not found`,
            },
        });
    }
    /**
     * Create Stripe Checkout session for store subscription
     * @returns BillingCheckoutResponse Checkout session created
     * @throws ApiError
     */
    static postBillingCheckout({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/billing/checkout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Billing service is not configured`,
            },
        });
    }
    /**
     * Create Stripe customer portal session for store subscription
     * @returns BillingPortalResponse Portal session created
     * @throws ApiError
     */
    static postBillingPortal({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/billing/portal',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation or Stripe customer error`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Billing service is not configured`,
            },
        });
    }
    /**
     * Cancel store subscription
     * @returns BillingCancelResponse Subscription cancelled
     * @throws ApiError
     */
    static postBillingCancel({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/billing/cancel',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation or missing subscription error`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Billing service is not configured`,
            },
        });
    }
}
exports.BillingService = BillingService;
