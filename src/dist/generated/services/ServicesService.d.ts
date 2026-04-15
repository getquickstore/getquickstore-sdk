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
    static getServices(): CancelablePromise<ServiceListResponse>;
    /**
     * Create service
     * @returns Service Service created
     * @throws ApiError
     */
    static postServices({ requestBody, }: {
        requestBody: CreateServiceRequest;
    }): CancelablePromise<Service>;
    /**
     * Get service availability for date
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    static getServicesAvailability({ id, date, }: {
        id: string;
        date: string;
    }): CancelablePromise<ServiceAvailabilityResponse>;
}
