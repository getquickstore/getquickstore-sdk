/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartAddRequest } from '../models/CartAddRequest';
import type { CartRemoveRequest } from '../models/CartRemoveRequest';
import type { CartResponse } from '../models/CartResponse';
import type { CartSetQtyRequest } from '../models/CartSetQtyRequest';
import type { CartSingleResponse } from '../models/CartSingleResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Get buyer carts across stores
     * @returns CartResponse Buyer cart items across stores
     * @throws ApiError
     */
    public static getCart(): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cart',
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Add product to buyer cart
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    public static postCartAdd({
        requestBody,
    }: {
        requestBody: CartAddRequest,
    }): CancelablePromise<CartSingleResponse> {
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
     * Set buyer cart item quantity
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    public static postCartSetQty({
        requestBody,
    }: {
        requestBody: CartSetQtyRequest,
    }): CancelablePromise<CartSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/set-qty',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Cart item not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Remove buyer cart item
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    public static postCartRemove({
        requestBody,
    }: {
        requestBody: CartRemoveRequest,
    }): CancelablePromise<CartSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/remove',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Cart item not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Clear all buyer carts
     * @returns CartResponse Buyer carts cleared
     * @throws ApiError
     */
    public static postCartClear(): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart/clear',
            errors: {
                500: `Server error`,
            },
        });
    }
}
