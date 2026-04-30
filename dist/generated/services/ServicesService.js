"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ServicesService {
    /**
     * List services
     * Returns active services for the current store. includeInactive works only for users who can manage the store.
     * @returns ServiceListResponse Service list
     * @throws ApiError
     */
    static getServices({ xStoreId, includeInactive, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/services',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'includeInactive': includeInactive,
            },
            errors: {
                400: `Store id is required`,
                404: `Store not found`,
                500: `Service list failed`,
            },
        });
    }
    /**
     * Create service
     * Creates a bookable service. Requires seller/admin access to the current store.
     * @returns Service Service created
     * @throws ApiError
     */
    static postServices({ xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/services',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                500: `Service create failed`,
            },
        });
    }
    /**
     * Update service
     * Updates a bookable service. Requires seller/admin access to the current store.
     * @returns Service Service updated
     * @throws ApiError
     */
    static patchServices({ xStoreId, id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/services/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                404: `Service not found`,
                500: `Service update failed`,
            },
        });
    }
    /**
     * Delete service
     * Soft-deletes the service by setting isActive=false and removes related service images and favorites. Bookings are preserved.
     * @returns OkResponse Service deleted
     * @throws ApiError
     */
    static deleteServices({ xStoreId, id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/services/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                404: `Service not found`,
                500: `Service delete failed`,
            },
        });
    }
    /**
     * Get service availability for date
     * Returns available booking slots for an active service in the current store.
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    static getServicesAvailability({ xStoreId, id, date, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/services/{id}/availability',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'date': date,
            },
            errors: {
                400: `Validation failed`,
                404: `Store or service not found`,
                500: `Service availability failed`,
            },
        });
    }
}
exports.ServicesService = ServicesService;
