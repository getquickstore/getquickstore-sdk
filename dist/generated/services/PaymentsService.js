"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class PaymentsService {
    /**
     * Create Stripe Checkout session for buyer order
     * @returns PaymentCheckoutResponse Checkout session created
     * @throws ApiError
     */
    static postPaymentsCheckout({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/checkout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                403: `Access denied`,
                404: `Order not found`,
                409: `Conflict`,
            },
        });
    }
    /**
     * Create refund for payment
     * @returns CreateRefundResponse Refund created
     * @throws ApiError
     */
    static postPaymentsRefund({ paymentId, xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/{paymentId}/refund',
            path: {
                'paymentId': paymentId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                403: `Access denied`,
                404: `Payment not found`,
                409: `Conflict`,
            },
        });
    }
}
exports.PaymentsService = PaymentsService;
