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
    static getServices() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/services',
        });
    }
    /**
     * Create service
     * @returns Service Service created
     * @throws ApiError
     */
    static postServices({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/services',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get service availability for date
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    static getServicesAvailability({ id, date, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/services/{id}/availability',
            path: {
                'id': id,
            },
            query: {
                'date': date,
            },
        });
    }
}
exports.ServicesService = ServicesService;
