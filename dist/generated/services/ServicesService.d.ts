import type { CreateServiceRequest } from '../models/CreateServiceRequest';
import type { Service } from '../models/Service';
import type { ServiceAvailabilityResponse } from '../models/ServiceAvailabilityResponse';
import type { ServiceListResponse } from '../models/ServiceListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ServicesService {
    /**
     * List services
     * Returns active services for the current store. includeInactive works only for users who can manage the store.
     * @returns ServiceListResponse Service list
     * @throws ApiError
     */
    static getServices({ xStoreId, includeInactive, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Include inactive services. Only applied for seller/admin users with store access.
         */
        includeInactive?: boolean;
    }): CancelablePromise<ServiceListResponse>;
    /**
     * Create service
     * Creates a bookable service. Requires seller/admin access to the current store.
     * @returns Service Service created
     * @throws ApiError
     */
    static postServices({ xStoreId, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        requestBody: CreateServiceRequest;
    }): CancelablePromise<Service>;
    /**
     * Get service availability for date
     * Returns available booking slots for an active service in the current store.
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    static getServicesAvailability({ xStoreId, id, date, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Service id.
         */
        id: string;
        /**
         * Date in YYYY-MM-DD format.
         */
        date: string;
    }): CancelablePromise<ServiceAvailabilityResponse>;
}
