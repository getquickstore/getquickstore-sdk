import type { AnalyticsOverviewResponse } from '../models/AnalyticsOverviewResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class AnalyticsService {
    /**
     * Get store analytics overview
     * Returns sales, bookings, orders and customer analytics for the current store.
     * @returns AnalyticsOverviewResponse Analytics overview
     * @throws ApiError
     */
    static getAnalyticsOverview({ xStoreId, range, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Analytics date range.
         */
        range?: '1d' | '7d' | '30d' | '90d';
    }): CancelablePromise<AnalyticsOverviewResponse>;
}
