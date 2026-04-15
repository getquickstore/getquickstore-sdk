import type { CalendarDayResponse } from '../models/CalendarDayResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class CalendarService {
    /**
     * Get calendar items for day
     * @returns CalendarDayResponse Calendar day view
     * @throws ApiError
     */
    static getCalendarDay({ date, }: {
        date: string;
    }): CancelablePromise<CalendarDayResponse>;
}
