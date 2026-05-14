import type { CreateServiceRequest } from '../models/CreateServiceRequest';
import type { CreateServiceReviewRequest } from '../models/CreateServiceReviewRequest';
import type { OkResponse } from '../models/OkResponse';
import type { Service } from '../models/Service';
import type { ServiceAvailabilityResponse } from '../models/ServiceAvailabilityResponse';
import type { ServiceListResponse } from '../models/ServiceListResponse';
import type { ServiceReviewCreateResponse } from '../models/ServiceReviewCreateResponse';
import type { ServiceReviewListResponse } from '../models/ServiceReviewListResponse';
import type { UpdateServiceRequest } from '../models/UpdateServiceRequest';
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
     * Update service
     * Updates a bookable service. Requires seller/admin access to the current store.
     * @returns Service Service updated
     * @throws ApiError
     */
    static patchServices({ xStoreId, id, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Service id.
         */
        id: string;
        requestBody: UpdateServiceRequest;
    }): CancelablePromise<Service>;
    /**
     * Delete service
     * Soft-deletes the service by setting isActive=false and removes related service images, tags, reviews and favorites. Bookings are preserved.
     * @returns OkResponse Service deleted
     * @throws ApiError
     */
    static deleteServices({ xStoreId, id, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Service id.
         */
        id: string;
    }): CancelablePromise<OkResponse>;
    /**
     * List service reviews
     * @returns ServiceReviewListResponse Service reviews list
     * @throws ApiError
     */
    static getServicesReviews({ xStoreId, id, limit, offset, }: {
        xStoreId: string;
        id: string;
        limit?: number;
        offset?: number;
    }): CancelablePromise<ServiceReviewListResponse>;
    /**
     * Create service review
     * Creates a review for a completed paid booking. One booking can be reviewed only once.
     * @returns ServiceReviewCreateResponse Service review created
     * @throws ApiError
     */
    static postServicesReviews({ xStoreId, id, requestBody, }: {
        xStoreId: string;
        id: string;
        requestBody: CreateServiceReviewRequest;
    }): CancelablePromise<ServiceReviewCreateResponse>;
    /**
     * Flag service review
     * @returns OkResponse Service review flagged
     * @throws ApiError
     */
    static postServicesReviewsFlag({ xStoreId, id, rid, }: {
        xStoreId: string;
        id: string;
        rid: string;
    }): CancelablePromise<OkResponse>;
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
