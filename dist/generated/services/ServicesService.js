"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ServicesService {
    /**
     * List services
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
                403: `Access denied`,
                500: `Service list failed`,
            },
        });
    }
    /**
     * Create service
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
     * Get service availability for date
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
                403: `Access denied`,
                404: `Service not found`,
                500: `Service availability failed`,
            },
        });
    }
}
exports.ServicesService = ServicesService;
