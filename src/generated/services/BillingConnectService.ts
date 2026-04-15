/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StripeConnectStatusResponse } from '../models/StripeConnectStatusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BillingConnectService {
    /**
     * Get Stripe Connect status for a store
     * @returns StripeConnectStatusResponse Stripe Connect status returned
     * @throws ApiError
     */
    public static getBillingStoresStripeConnectStatus({
        id,
    }: {
        /**
         * Store id
         */
        id: string,
    }): CancelablePromise<StripeConnectStatusResponse> {
        return __request(OpenAPI, {
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
    public static postBillingStoresStripeConnectSync({
        id,
    }: {
        /**
         * Store id
         */
        id: string,
    }): CancelablePromise<StripeConnectStatusResponse> {
        return __request(OpenAPI, {
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
