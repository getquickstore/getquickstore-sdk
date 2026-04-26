"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AvailabilityService {
    /**
     * List availability windows
     * Returns all availability windows for the current store. Requires seller/admin access.
     * @returns AvailabilityListResponse Availability list
     * @throws ApiError
     */
    static getAvailability({ xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAvailability({ xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static putAvailabilityBulk({ xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getAvailabilityPublicServicesSlots({ serviceId, date, storeId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchAvailability({ xStoreId, id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static deleteAvailability({ xStoreId, id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.AvailabilityService = AvailabilityService;
