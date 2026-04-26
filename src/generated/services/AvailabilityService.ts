/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailabilityBulkRequest } from '../models/AvailabilityBulkRequest';
import type { AvailabilityItemResponse } from '../models/AvailabilityItemResponse';
import type { AvailabilityListResponse } from '../models/AvailabilityListResponse';
import type { AvailabilityPatchRequest } from '../models/AvailabilityPatchRequest';
import type { AvailabilityUpsertRequest } from '../models/AvailabilityUpsertRequest';
import type { PublicServiceSlotsResponse } from '../models/PublicServiceSlotsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AvailabilityService {
    /**
     * List availability windows
     * Returns all availability windows for the current store. Requires seller/admin access.
     * @returns AvailabilityListResponse Availability list
     * @throws ApiError
     */
    public static getAvailability({
        xStoreId,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
    }): CancelablePromise<AvailabilityListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/availability',
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Store id is required`,
                403: `Access denied`,
                500: `Availability list failed`,
            },
        });
    }
    /**
     * Create or update availability window
     * Creates or updates a working time window for a weekday. Upserts by storeId + weekday.
     * @returns AvailabilityItemResponse Availability created or updated
     * @throws ApiError
     */
    public static postAvailability({
        xStoreId,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        requestBody: AvailabilityUpsertRequest,
    }): CancelablePromise<AvailabilityItemResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/availability',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                403: `Access denied`,
                500: `Availability upsert failed`,
            },
        });
    }
    /**
     * Bulk upsert availability windows
     * Creates or updates multiple weekday availability windows for the current store.
     * @returns AvailabilityListResponse Availability windows updated
     * @throws ApiError
     */
    public static putAvailabilityBulk({
        xStoreId,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        requestBody: AvailabilityBulkRequest,
    }): CancelablePromise<AvailabilityListResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/availability/bulk',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                403: `Access denied`,
                500: `Availability bulk update failed`,
            },
        });
    }
    /**
     * Get public service slots
     * Returns public booking slots for a service and date. Does not expose customer or booking details.
     * @returns PublicServiceSlotsResponse Public slots for selected service and date
     * @throws ApiError
     */
    public static getAvailabilityPublicServicesSlots({
        serviceId,
        date,
        storeId,
    }: {
        /**
         * Service id.
         */
        serviceId: string,
        date: string,
        /**
         * Store id.
         */
        storeId: string,
    }): CancelablePromise<PublicServiceSlotsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/availability/public/services/{serviceId}/slots',
            path: {
                'serviceId': serviceId,
            },
            query: {
                'date': date,
                'storeId': storeId,
            },
            errors: {
                400: `Validation error`,
                404: `Service not found`,
                500: `Public availability slots failed`,
            },
        });
    }
    /**
     * Update availability window
     * Updates one availability window by id. Requires seller/admin access.
     * @returns AvailabilityItemResponse Availability updated
     * @throws ApiError
     */
    public static patchAvailability({
        xStoreId,
        id,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Availability window id.
         */
        id: string,
        requestBody: AvailabilityPatchRequest,
    }): CancelablePromise<AvailabilityItemResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/availability/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                403: `Access denied`,
                404: `Availability not found`,
                409: `Weekday already exists`,
                500: `Availability update failed`,
            },
        });
    }
    /**
     * Delete availability window
     * Deletes one availability window by id. Requires seller/admin access.
     * @returns void
     * @throws ApiError
     */
    public static deleteAvailability({
        xStoreId,
        id,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Availability window id.
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/availability/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Store id is required`,
                403: `Access denied`,
                404: `Availability not found`,
                500: `Availability delete failed`,
            },
        });
    }
}
