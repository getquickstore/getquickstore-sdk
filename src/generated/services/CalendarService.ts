/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarResponse } from '../models/CalendarResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CalendarService {
    /**
     * Get calendar items for day
     * Returns bookings for one calendar day in the current store context. Requires seller/admin access to the store.
     * @returns CalendarResponse Calendar day view
     * @throws ApiError
     */
    public static getCalendarDay({
        xStoreId,
        date,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Local date in YYYY-MM-DD format.
         */
        date: string,
    }): CancelablePromise<CalendarResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calendar/day',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'date': date,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied for current store`,
                500: `Failed to load calendar day`,
            },
        });
    }
    /**
     * Get calendar items for week
     * Returns bookings for the Monday-first week containing the given local date. Requires seller/admin access to the store.
     * @returns CalendarResponse Calendar week view
     * @throws ApiError
     */
    public static getCalendarWeek({
        xStoreId,
        date,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Local date in YYYY-MM-DD format.
         */
        date: string,
    }): CancelablePromise<CalendarResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calendar/week',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'date': date,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied for current store`,
                500: `Failed to load calendar week`,
            },
        });
    }
}
