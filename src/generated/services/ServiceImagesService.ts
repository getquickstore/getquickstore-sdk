/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceImage } from '../models/ServiceImage';
import type { ServiceImageCreateRequest } from '../models/ServiceImageCreateRequest';
import type { ServiceImagePresignRequest } from '../models/ServiceImagePresignRequest';
import type { ServiceImageUpdateRequest } from '../models/ServiceImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServiceImagesService {
    /**
     * List service images
     * @returns any Service images list
     * @throws ApiError
     */
    public static getServicesImages({
        serviceId,
        xStoreId,
    }: {
        /**
         * Service ID
         */
        serviceId: string,
        /**
         * Store context ID
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        images: Array<ServiceImage>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services/{serviceId}/images',
            path: {
                'serviceId': serviceId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Save service image metadata
     * Call this after uploading the binary file with the presigned URL.
     * @returns any Image saved
     * @throws ApiError
     */
    public static postServicesImages({
        serviceId,
        requestBody,
        xStoreId,
    }: {
        /**
         * Service ID
         */
        serviceId: string,
        requestBody: ServiceImageCreateRequest,
        /**
         * Store context ID
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        image: ServiceImage;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/services/{serviceId}/images',
            path: {
                'serviceId': serviceId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Create presigned upload URL
     * Returns a direct upload URL for R2/S3-compatible storage. Upload the file with PUT, then save metadata with POST /services/{serviceId}/images.
     * @returns any Presigned URL created
     * @throws ApiError
     */
    public static postServicesImagesPresign({
        serviceId,
        requestBody,
        xStoreId,
    }: {
        /**
         * Service ID
         */
        serviceId: string,
        requestBody: ServiceImagePresignRequest,
        /**
         * Store context ID
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        uploadUrl: string;
        key: string;
        url: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/services/{serviceId}/images/presign',
            path: {
                'serviceId': serviceId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Update service image metadata
     * @returns any Image updated
     * @throws ApiError
     */
    public static patchServicesImages({
        serviceId,
        imageId,
        requestBody,
        xStoreId,
    }: {
        /**
         * Service ID
         */
        serviceId: string,
        /**
         * Service image ID
         */
        imageId: string,
        requestBody: ServiceImageUpdateRequest,
        /**
         * Store context ID
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        image: ServiceImage;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/services/{serviceId}/images/{imageId}',
            path: {
                'serviceId': serviceId,
                'imageId': imageId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Delete service image
     * Deletes service image metadata and attempts to remove the object from storage.
     * @returns any Image deleted
     * @throws ApiError
     */
    public static deleteServicesImages({
        serviceId,
        imageId,
        xStoreId,
    }: {
        /**
         * Service ID
         */
        serviceId: string,
        /**
         * Service image ID
         */
        imageId: string,
        /**
         * Store context ID
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        imageId: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/services/{serviceId}/images/{imageId}',
            path: {
                'serviceId': serviceId,
                'imageId': imageId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
}
