/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartAddRequest } from '../models/CartAddRequest';
import type { CartRemoveRequest } from '../models/CartRemoveRequest';
import type { CartResponse } from '../models/CartResponse';
import type { CartSetQtyRequest } from '../models/CartSetQtyRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Get current cart
     * @returns CartResponse Current cart
     * @throws ApiError
     */
    public static getCart({
        xStoreId,
    }: {
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cart',
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                403: `Access denied`,
                500: `Server error`,
            },
        });
    }
    /**
     * Add product to buyer cart
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    public static postCartAdd({
        requestBody,
    }: {
        requestBody: CartAddRequest,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or product is not published`,
                404: `Product or variant not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Set cart item quantity
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    public static postCartSetQty({
        requestBody,
        xStoreId,
    }: {
        requestBody: CartSetQtyRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/set-qty',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                403: `Access denied`,
                404: `Cart item not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Remove cart item
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    public static postCartRemove({
        requestBody,
        xStoreId,
    }: {
        requestBody: CartRemoveRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/remove',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                403: `Access denied`,
                404: `Cart item not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Clear current cart
     * @returns CartResponse Cart cleared
     * @throws ApiError
     */
    public static postCartClear({
        xStoreId,
    }: {
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/clear',
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                403: `Access denied`,
                500: `Server error`,
            },
        });
    }
}
