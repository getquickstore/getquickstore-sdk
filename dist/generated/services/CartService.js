"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CartService {
    /**
     * Get buyer carts across stores
     * @returns CartResponse Buyer cart items across stores
     * @throws ApiError
     */
    static getCart() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/cart',
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Add product to buyer cart
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    static postCartAdd({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postCartSetQty({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postCartRemove({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postCartClear({ xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.CartService = CartService;
