/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsOverviewResponse } from '../models/AnalyticsOverviewResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsService {
    /**
     * Get store analytics overview
     * Returns sales, bookings, orders and customer analytics for the current store.
     * @returns AnalyticsOverviewResponse Analytics overview
     * @throws ApiError
     */
    public static getAnalyticsOverview({
        xStoreId,
        range = '7d',
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Analytics date range.
         */
        range?: '1d' | '7d' | '30d' | '90d',
    }): CancelablePromise<AnalyticsOverviewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/analytics/overview',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'range': range,
            },
            errors: {
                400: `Store id is required`,
                403: `Access denied`,
                500: `Analytics overview failed`,
            },
        });
    }
}
