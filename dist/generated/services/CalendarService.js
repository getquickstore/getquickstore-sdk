"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CalendarService {
    /**
     * Get calendar items for day
     * @returns CalendarDayResponse Calendar day view
     * @throws ApiError
     */
    static getCalendarDay({ date, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/calendar/day',
            query: {
                'date': date,
            },
        });
    }
}
exports.CalendarService = CalendarService;
