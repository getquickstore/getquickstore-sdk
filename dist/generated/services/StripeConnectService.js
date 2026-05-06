"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeConnectService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class StripeConnectService {
    /**
     * Reuse existing Stripe account for store
     * @returns StripeConnectReuseResponse Stripe account reused
     * @throws ApiError
     */
    static postBillingStoresStripeConnectReuse({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/billing/stores/{id}/stripe/connect/reuse',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
exports.StripeConnectService = StripeConnectService;
