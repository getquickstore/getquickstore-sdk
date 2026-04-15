/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarDayResponse } from '../models/CalendarDayResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CalendarService {
    /**
     * Get calendar items for day
     * @returns CalendarDayResponse Calendar day view
     * @throws ApiError
     */
    public static getCalendarDay({
        date,
    }: {
        date: string,
    }): CancelablePromise<CalendarDayResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calendar/day',
            query: {
                'date': date,
            },
        });
    }
}
