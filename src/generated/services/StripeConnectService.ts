/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StripeConnectReuseRequest } from '../models/StripeConnectReuseRequest';
import type { StripeConnectReuseResponse } from '../models/StripeConnectReuseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StripeConnectService {
    /**
     * Reuse existing Stripe account for store
     * @returns StripeConnectReuseResponse Stripe account reused
     * @throws ApiError
     */
    public static postBillingStoresStripeConnectReuse({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: StripeConnectReuseRequest,
    }): CancelablePromise<StripeConnectReuseResponse> {
        return __request(OpenAPI, {
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
