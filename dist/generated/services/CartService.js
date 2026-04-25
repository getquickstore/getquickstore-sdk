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
     * @returns CartSingleResponse Cart updated
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
     * Set buyer cart item quantity
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    static postCartSetQty({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postCartRemove({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postCartClear() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/cart/clear',
            errors: {
                500: `Server error`,
            },
        });
    }
}
exports.CartService = CartService;
