/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingPaymentCheckoutPreviewRequest } from '../models/BookingPaymentCheckoutPreviewRequest';
import type { BookingPaymentCheckoutPreviewResponse } from '../models/BookingPaymentCheckoutPreviewResponse';
import type { BookingPaymentCheckoutRequest } from '../models/BookingPaymentCheckoutRequest';
import type { BookingSeriesCustomPaymentCheckoutPreviewRequest } from '../models/BookingSeriesCustomPaymentCheckoutPreviewRequest';
import type { BookingSeriesCustomPaymentCheckoutPreviewResponse } from '../models/BookingSeriesCustomPaymentCheckoutPreviewResponse';
import type { BookingSeriesPaymentCheckoutPreviewRequest } from '../models/BookingSeriesPaymentCheckoutPreviewRequest';
import type { BookingSeriesPaymentCheckoutPreviewResponse } from '../models/BookingSeriesPaymentCheckoutPreviewResponse';
import type { BookingSeriesPaymentCheckoutRequest } from '../models/BookingSeriesPaymentCheckoutRequest';
import type { BookingSeriesPaymentCheckoutResponse } from '../models/BookingSeriesPaymentCheckoutResponse';
import type { CreateRefundRequest } from '../models/CreateRefundRequest';
import type { CreateRefundResponse } from '../models/CreateRefundResponse';
import type { PaymentCheckoutPreviewRequest } from '../models/PaymentCheckoutPreviewRequest';
import type { PaymentCheckoutPreviewResponse } from '../models/PaymentCheckoutPreviewResponse';
import type { PaymentCheckoutRequest } from '../models/PaymentCheckoutRequest';
import type { PaymentCheckoutResponse } from '../models/PaymentCheckoutResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * Preview checkout totals before Stripe checkout
     * @returns PaymentCheckoutPreviewResponse Checkout preview calculated
     * @throws ApiError
     */
    public static postPaymentsCheckoutPreview({
        requestBody,
    }: {
        requestBody: PaymentCheckoutPreviewRequest,
    }): CancelablePromise<PaymentCheckoutPreviewResponse> {
        return __request(OpenAPI, {
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
    public static postPaymentsCheckout({
        requestBody,
    }: {
        requestBody: PaymentCheckoutRequest,
    }): CancelablePromise<PaymentCheckoutResponse> {
        return __request(OpenAPI, {
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
    public static postPaymentsBookingsCheckoutPreview({
        requestBody,
    }: {
        requestBody: BookingPaymentCheckoutPreviewRequest,
    }): CancelablePromise<BookingPaymentCheckoutPreviewResponse> {
        return __request(OpenAPI, {
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
    public static postPaymentsBookingsSeriesCheckoutPreview({
        requestBody,
    }: {
        requestBody: BookingSeriesPaymentCheckoutPreviewRequest,
    }): CancelablePromise<BookingSeriesPaymentCheckoutPreviewResponse> {
        return __request(OpenAPI, {
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
    public static postPaymentsBookingsCheckout({
        requestBody,
    }: {
        requestBody: BookingPaymentCheckoutRequest,
    }): CancelablePromise<PaymentCheckoutResponse> {
        return __request(OpenAPI, {
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
     * Preview custom booking series checkout totals before Stripe checkout
     * @returns BookingSeriesCustomPaymentCheckoutPreviewResponse Custom booking series checkout preview calculated
     * @throws ApiError
     */
    public static postPaymentsBookingsSeriesCustomPreview({
        requestBody,
    }: {
        requestBody: BookingSeriesCustomPaymentCheckoutPreviewRequest,
    }): CancelablePromise<BookingSeriesCustomPaymentCheckoutPreviewResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payments/bookings/series/custom-preview',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `UNAUTHORIZED`,
                404: `Service not found`,
            },
        });
    }
    /**
     * Create Stripe Checkout session for booking series
     * @returns BookingSeriesPaymentCheckoutResponse Booking series checkout session created
     * @throws ApiError
     */
    public static postPaymentsBookingsSeriesCheckout({
        requestBody,
    }: {
        requestBody: BookingSeriesPaymentCheckoutRequest,
    }): CancelablePromise<BookingSeriesPaymentCheckoutResponse> {
        return __request(OpenAPI, {
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
    public static postPaymentsRefund({
        paymentId,
        xStoreId,
        requestBody,
    }: {
        paymentId: string,
        /**
         * Store context id. If provided, must match the payment store.
         */
        xStoreId?: string,
        requestBody?: CreateRefundRequest,
    }): CancelablePromise<CreateRefundResponse> {
        return __request(OpenAPI, {
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
