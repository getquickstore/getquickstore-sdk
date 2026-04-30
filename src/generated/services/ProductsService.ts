/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductRequest } from '../models/CreateProductRequest';
import type { OkResponse } from '../models/OkResponse';
import type { ProductDetail } from '../models/ProductDetail';
import type { ProductListResponse } from '../models/ProductListResponse';
import type { PublicProductResponse } from '../models/PublicProductResponse';
import type { UpdateProductRequest } from '../models/UpdateProductRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * List products
     * @returns ProductListResponse Product list
     * @throws ApiError
     */
    public static getProducts({
        xStoreId,
    }: {
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<ProductListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Create product
     * @returns ProductDetail Product created
     * @throws ApiError
     */
    public static postProducts({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateProductRequest,
        /**
         * Store context id. If omitted, server may use req.user.defaultStoreId
         */
        xStoreId?: string,
    }): CancelablePromise<ProductDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get public product by id
     * @returns PublicProductResponse Public product details
     * @throws ApiError
     */
    public static getProductsPublic({
        id,
        storeId,
    }: {
        id: string,
        /**
         * Public store id
         */
        storeId: string,
    }): CancelablePromise<PublicProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/public/{id}',
            path: {
                'id': id,
            },
            query: {
                'storeId': storeId,
            },
            errors: {
                400: `Store id required`,
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get product by id
     * @returns ProductDetail Product details
     * @throws ApiError
     */
    public static getProducts1({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<ProductDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Validation error`,
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Update product by id
     * @returns ProductDetail Product updated
     * @throws ApiError
     */
    public static patchProducts({
        id,
        requestBody,
        xStoreId,
    }: {
        id: string,
        requestBody: UpdateProductRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<ProductDetail> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Unauthorized`,
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Delete product and cleanup related data
     * Soft-deletes the product, removes product images, category links, reviews, favorites and cart items. Order items are preserved.
     * @returns OkResponse Product deleted
     * @throws ApiError
     */
    public static deleteProducts({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
}
