"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImagesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ProductImagesService {
    /**
     * List product images
     * @returns any Product images list
     * @throws ApiError
     */
    static getProductsImages({ productId, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/products/{productId}/images',
            path: {
                'productId': productId,
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
     * Save product image metadata
     * Call this after uploading the binary file with the presigned URL.
     * @returns any Image saved
     * @throws ApiError
     */
    static postProductsImages({ productId, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/products/{productId}/images',
            path: {
                'productId': productId,
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
     * Returns a direct upload URL for R2/S3-compatible storage. Upload the file with PUT, then save metadata with POST /products/{productId}/images.
     * @returns any Presigned URL created
     * @throws ApiError
     */
    static postProductsImagesPresign({ productId, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/products/{productId}/images/presign',
            path: {
                'productId': productId,
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
     * Update product image metadata
     * @returns any Image updated
     * @throws ApiError
     */
    static patchProductsImages({ productId, imageId, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/products/{productId}/images/{imageId}',
            path: {
                'productId': productId,
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
     * Delete product image
     * Deletes product image metadata and attempts to remove the object from storage.
     * @returns any Image deleted
     * @throws ApiError
     */
    static deleteProductsImages({ productId, imageId, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/products/{productId}/images/{imageId}',
            path: {
                'productId': productId,
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
exports.ProductImagesService = ProductImagesService;
