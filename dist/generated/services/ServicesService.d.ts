import type { CreateServiceRequest } from '../models/CreateServiceRequest';
import type { Service } from '../models/Service';
import type { ServiceAvailabilityResponse } from '../models/ServiceAvailabilityResponse';
import type { ServiceListResponse } from '../models/ServiceListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ServicesService {
    /**
     * List services
     * @returns ServiceListResponse Service list
     * @throws ApiError
     */
    static getServices({ xStoreId, includeInactive, }: {
        /**
         * Store context id
         */
        xStoreId: string;
        /**
         * Include inactive services
         */
        includeInactive?: boolean;
    }): CancelablePromise<ServiceListResponse>;
    /**
     * Create service
     * @returns Service Service created
     * @throws ApiError
     */
    static postServices({ xStoreId, requestBody, }: {
        /**
         * Store context id
         */
        xStoreId: string;
        requestBody: CreateServiceRequest;
    }): CancelablePromise<Service>;
    /**
     * Get service availability for date
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    static getServicesAvailability({ xStoreId, id, date, }: {
        /**
         * Store context id
         */
        xStoreId: string;
        /**
         * Service id
         */
        id: string;
        /**
         * Date in YYYY-MM-DD format
         */
        date: string;
    }): CancelablePromise<ServiceAvailabilityResponse>;
}
