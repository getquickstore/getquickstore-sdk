"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceImagesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ServiceImagesService {
    /**
     * List service images
     * @returns any Service images list
     * @throws ApiError
     */
    static getServicesImages({ serviceId, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postServicesImages({ serviceId, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postServicesImagesPresign({ serviceId, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchServicesImages({ serviceId, imageId, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static deleteServicesImages({ serviceId, imageId, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.ServiceImagesService = ServiceImagesService;
