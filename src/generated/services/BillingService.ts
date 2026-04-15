/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingCancelRequest } from '../models/BillingCancelRequest';
import type { BillingCancelResponse } from '../models/BillingCancelResponse';
import type { BillingCheckoutRequest } from '../models/BillingCheckoutRequest';
import type { BillingCheckoutResponse } from '../models/BillingCheckoutResponse';
import type { BillingCurrentResponse } from '../models/BillingCurrentResponse';
import type { BillingPlansResponse } from '../models/BillingPlansResponse';
import type { BillingPortalRequest } from '../models/BillingPortalRequest';
import type { BillingPortalResponse } from '../models/BillingPortalResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BillingService {
    /**
     * List available billing plans
     * @returns BillingPlansResponse Available plans
     * @throws ApiError
     */
    public static getBillingPlans(): CancelablePromise<BillingPlansResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/plans',
        });
    }
    /**
     * Get current billing state for the user's current or latest owned store
     * @returns BillingCurrentResponse Current billing state
     * @throws ApiError
     */
    public static getBillingCurrent({
        xStoreId,
        storeId,
    }: {
        /**
         * Store context id. Can also be passed as query param storeId.
         */
        xStoreId?: string,
        /**
         * Store id. Optional if x-store-id header or user defaultStoreId is available.
         */
        storeId?: string,
    }): CancelablePromise<BillingCurrentResponse> {
        return __request(OpenAPI, {
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
    public static getBillingStoresCurrent({
        id,
    }: {
        /**
         * Store id
         */
        id: string,
    }): CancelablePromise<BillingCurrentResponse> {
        return __request(OpenAPI, {
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
    public static postBillingCheckout({
        requestBody,
    }: {
        requestBody?: BillingCheckoutRequest,
    }): CancelablePromise<BillingCheckoutResponse> {
        return __request(OpenAPI, {
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
    public static postBillingPortal({
        requestBody,
    }: {
        requestBody?: BillingPortalRequest,
    }): CancelablePromise<BillingPortalResponse> {
        return __request(OpenAPI, {
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
    public static postBillingCancel({
        requestBody,
    }: {
        requestBody?: BillingCancelRequest,
    }): CancelablePromise<BillingCancelResponse> {
        return __request(OpenAPI, {
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
