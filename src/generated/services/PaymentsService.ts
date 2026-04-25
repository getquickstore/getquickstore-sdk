/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRefundRequest } from '../models/CreateRefundRequest';
import type { CreateRefundResponse } from '../models/CreateRefundResponse';
import type { PaymentCheckoutRequest } from '../models/PaymentCheckoutRequest';
import type { PaymentCheckoutResponse } from '../models/PaymentCheckoutResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
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
     * Create refund for payment
     * @returns CreateRefundResponse Refund created
     * @throws ApiError
     */
    public static postPaymentsRefund({
        paymentId,
        xStoreId,
        requestBody,
    }: {
        /**
         * Payment id
         */
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
