"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AnalyticsService {
    /**
     * Get store analytics overview
     * Returns sales, bookings, orders and customer analytics for the current store.
     * @returns AnalyticsOverviewResponse Analytics overview
     * @throws ApiError
     */
    static getAnalyticsOverview({ xStoreId, range = '7d', }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.AnalyticsService = AnalyticsService;
