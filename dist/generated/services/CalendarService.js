"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CalendarService {
    /**
     * Get calendar items for day
     * Returns bookings for one calendar day in the current store context. Requires seller/admin access to the store.
     * @returns CalendarResponse Calendar day view
     * @throws ApiError
     */
    static getCalendarDay({ xStoreId, date, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getCalendarWeek({ xStoreId, date, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.CalendarService = CalendarService;
