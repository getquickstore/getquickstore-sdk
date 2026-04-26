import type { CalendarResponse } from '../models/CalendarResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class CalendarService {
    /**
     * Get calendar items for day
     * Returns bookings for one calendar day in the current store context. Requires seller/admin access to the store.
     * @returns CalendarResponse Calendar day view
     * @throws ApiError
     */
    static getCalendarDay({ xStoreId, date, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Local date in YYYY-MM-DD format.
         */
        date: string;
    }): CancelablePromise<CalendarResponse>;
    /**
     * Get calendar items for week
     * Returns bookings for the Monday-first week containing the given local date. Requires seller/admin access to the store.
     * @returns CalendarResponse Calendar week view
     * @throws ApiError
     */
    static getCalendarWeek({ xStoreId, date, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Local date in YYYY-MM-DD format.
         */
        date: string;
    }): CancelablePromise<CalendarResponse>;
}
