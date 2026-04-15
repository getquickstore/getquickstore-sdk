/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductImage } from '../models/ProductImage';
import type { ProductImageCreateRequest } from '../models/ProductImageCreateRequest';
import type { ProductImagePresignRequest } from '../models/ProductImagePresignRequest';
import type { ProductImageUpdateRequest } from '../models/ProductImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductImagesService {
    /**
     * List product images
     * @returns any Product images list
     * @throws ApiError
     */
    public static getProductsImages({
        productId,
        xStoreId,
    }: {
        /**
         * Product ID
         */
        productId: string,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        images: Array<ProductImage>;
    }> {
        return __request(OpenAPI, {
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
     * @returns any Image saved
     * @throws ApiError
     */
    public static postProductsImages({
        productId,
        requestBody,
        xStoreId,
    }: {
        /**
         * Product ID
         */
        productId: string,
        requestBody: ProductImageCreateRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        image: ProductImage;
    }> {
        return __request(OpenAPI, {
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
     * Create presigned upload URL for product image
     * @returns any Presigned URL created
     * @throws ApiError
     */
    public static postProductsImagesPresign({
        productId,
        requestBody,
        xStoreId,
    }: {
        /**
         * Product ID
         */
        productId: string,
        requestBody: ProductImagePresignRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        uploadUrl: string;
        key: string;
    }> {
        return __request(OpenAPI, {
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
    public static patchProductsImages({
        productId,
        imageId,
        requestBody,
        xStoreId,
    }: {
        /**
         * Product ID
         */
        productId: string,
        /**
         * Image ID
         */
        imageId: string,
        requestBody: ProductImageUpdateRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        image: ProductImage;
    }> {
        return __request(OpenAPI, {
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
     * @returns any Image deleted
     * @throws ApiError
     */
    public static deleteProductsImages({
        productId,
        imageId,
        xStoreId,
    }: {
        /**
         * Product ID
         */
        productId: string,
        /**
         * Image ID
         */
        imageId: string,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<{
        ok: boolean;
        imageId: string;
    }> {
        return __request(OpenAPI, {
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
