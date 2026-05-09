"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class PaymentsService {
    /**
     * Preview checkout totals before Stripe checkout
     * @returns PaymentCheckoutPreviewResponse Checkout preview calculated
     * @throws ApiError
     */
    static postPaymentsCheckoutPreview({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/checkout-preview',
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
     * Preview booking checkout totals before Stripe checkout
     * @returns BookingPaymentCheckoutPreviewResponse Booking checkout preview calculated
     * @throws ApiError
     */
    static postPaymentsBookingsCheckoutPreview({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/bookings/checkout-preview',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                403: `Access denied`,
                404: `Booking not found`,
            },
        });
    }
    /**
     * Preview booking series checkout totals before Stripe checkout
     * @returns BookingSeriesPaymentCheckoutPreviewResponse Booking series checkout preview calculated
     * @throws ApiError
     */
    static postPaymentsBookingsSeriesCheckoutPreview({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/bookings/series/checkout-preview',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                403: `Access denied`,
                404: `Booking series not found`,
            },
        });
    }
    /**
     * Create Stripe Checkout session for booking
     * @returns PaymentCheckoutResponse Booking checkout session created
     * @throws ApiError
     */
    static postPaymentsBookingsCheckout({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/bookings/checkout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                403: `Access denied`,
                404: `Booking not found`,
                409: `Conflict`,
            },
        });
    }
    /**
     * Create Stripe Checkout session for booking series
     * @returns BookingSeriesPaymentCheckoutResponse Booking series checkout session created
     * @throws ApiError
     */
    static postPaymentsBookingsSeriesCheckout({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/payments/bookings/series/checkout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                403: `Access denied`,
                404: `Booking series not found`,
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
