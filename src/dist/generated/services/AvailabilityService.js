"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AvailabilityService {
    /**
     * Create or update availability window
     * @returns AvailabilityWindow Availability created or updated
     * @throws ApiError
     */
    static postAvailability({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/availability',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
exports.AvailabilityService = AvailabilityService;
