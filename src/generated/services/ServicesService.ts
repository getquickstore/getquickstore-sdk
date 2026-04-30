/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServicesService {
    /**
     * List services
     * Returns active services for the current store. includeInactive works only for users who can manage the store.
     * @returns ServiceListResponse Service list
     * @throws ApiError
     */
    public static getServices({
        xStoreId,
        includeInactive,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Include inactive services. Only applied for seller/admin users with store access.
         */
        includeInactive?: boolean,
    }): CancelablePromise<ServiceListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'includeInactive': includeInactive,
            },
            errors: {
                400: `Store id is required`,
                404: `Store not found`,
                500: `Service list failed`,
            },
        });
    }
    /**
     * Create service
     * Creates a bookable service. Requires seller/admin access to the current store. Supports tagIds for existing tags and tagNames for creating/reusing tags by name.
     * @returns Service Service created
     * @throws ApiError
     */
    public static postServices({
        xStoreId,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        requestBody: CreateServiceRequest,
    }): CancelablePromise<Service> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/services',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                500: `Service create failed`,
            },
        });
    }
    /**
     * Update service
     * Updates a bookable service. Requires seller/admin access to the current store. If tagIds or tagNames are provided, service tags are replaced with the resolved tag set.
     * @returns Service Service updated
     * @throws ApiError
     */
    public static patchServices({
        xStoreId,
        id,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Service id.
         */
        id: string,
        requestBody: UpdateServiceRequest,
    }): CancelablePromise<Service> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/services/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                404: `Service not found`,
                500: `Service update failed`,
            },
        });
    }
    /**
     * Delete service
     * Soft-deletes the service by setting isActive=false and removes related service images, tags, reviews and favorites. Bookings are preserved.
     * @returns OkResponse Service deleted
     * @throws ApiError
     */
    public static deleteServices({
        xStoreId,
        id,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Service id.
         */
        id: string,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/services/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                404: `Service not found`,
                500: `Service delete failed`,
            },
        });
    }
    /**
     * List service reviews
     * @returns ServiceReviewListResponse Service reviews list
     * @throws ApiError
     */
    public static getServicesReviews({
        xStoreId,
        id,
        limit = 20,
        offset,
    }: {
        xStoreId: string,
        id: string,
        limit?: number,
        offset?: number,
    }): CancelablePromise<ServiceReviewListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services/{id}/reviews',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }
    /**
     * Create service review
     * @returns ServiceReviewCreateResponse Service review created
     * @throws ApiError
     */
    public static postServicesReviews({
        xStoreId,
        id,
        requestBody,
    }: {
        xStoreId: string,
        id: string,
        requestBody: CreateServiceReviewRequest,
    }): CancelablePromise<ServiceReviewCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/services/{id}/reviews',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Flag service review
     * @returns OkResponse Service review flagged
     * @throws ApiError
     */
    public static postServicesReviewsFlag({
        xStoreId,
        id,
        rid,
    }: {
        xStoreId: string,
        id: string,
        rid: string,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/services/{id}/reviews/{rid}/flag',
            path: {
                'id': id,
                'rid': rid,
            },
            headers: {
                'x-store-id': xStoreId,
            },
        });
    }
    /**
     * Get service availability for date
     * Returns available booking slots for an active service in the current store.
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    public static getServicesAvailability({
        xStoreId,
        id,
        date,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Service id.
         */
        id: string,
        /**
         * Date in YYYY-MM-DD format.
         */
        date: string,
    }): CancelablePromise<ServiceAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services/{id}/availability',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'date': date,
            },
            errors: {
                400: `Validation failed`,
                404: `Store or service not found`,
                500: `Service availability failed`,
            },
        });
    }
}
