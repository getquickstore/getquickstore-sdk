import type { AvailabilityBulkRequest } from '../models/AvailabilityBulkRequest';
import type { AvailabilityItemResponse } from '../models/AvailabilityItemResponse';
import type { AvailabilityListResponse } from '../models/AvailabilityListResponse';
import type { AvailabilityPatchRequest } from '../models/AvailabilityPatchRequest';
import type { AvailabilityUpsertRequest } from '../models/AvailabilityUpsertRequest';
import type { PublicServiceSlotsResponse } from '../models/PublicServiceSlotsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class AvailabilityService {
    /**
     * List availability windows
     * Returns all availability windows for the current store. Requires seller/admin access.
     * @returns AvailabilityListResponse Availability list
     * @throws ApiError
     */
    static getAvailability({ xStoreId, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
    }): CancelablePromise<AvailabilityListResponse>;
    /**
     * Create or update availability window
     * Creates or updates a working time window for a weekday. Upserts by storeId + weekday.
     * @returns AvailabilityItemResponse Availability created or updated
     * @throws ApiError
     */
    static postAvailability({ xStoreId, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        requestBody: AvailabilityUpsertRequest;
    }): CancelablePromise<AvailabilityItemResponse>;
    /**
     * Bulk upsert availability windows
     * Creates or updates multiple weekday availability windows for the current store.
     * @returns AvailabilityListResponse Availability windows updated
     * @throws ApiError
     */
    static putAvailabilityBulk({ xStoreId, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        requestBody: AvailabilityBulkRequest;
    }): CancelablePromise<AvailabilityListResponse>;
    /**
     * Get public service slots
     * Returns public booking slots for a service and date. Does not expose customer or booking details.
     * @returns PublicServiceSlotsResponse Public slots for selected service and date
     * @throws ApiError
     */
    static getAvailabilityPublicServicesSlots({ serviceId, date, storeId, }: {
        /**
         * Service id.
         */
        serviceId: string;
        date: string;
        /**
         * Store id.
         */
        storeId: string;
    }): CancelablePromise<PublicServiceSlotsResponse>;
    /**
     * Update availability window
     * Updates one availability window by id. Requires seller/admin access.
     * @returns AvailabilityItemResponse Availability updated
     * @throws ApiError
     */
    static patchAvailability({ xStoreId, id, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Availability window id.
         */
        id: string;
        requestBody: AvailabilityPatchRequest;
    }): CancelablePromise<AvailabilityItemResponse>;
    /**
     * Delete availability window
     * Deletes one availability window by id. Requires seller/admin access.
     * @returns void
     * @throws ApiError
     */
    static deleteAvailability({ xStoreId, id, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Availability window id.
         */
        id: string;
    }): CancelablePromise<void>;
}
