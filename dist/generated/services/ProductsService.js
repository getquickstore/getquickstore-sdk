"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ProductsService {
    /**
     * List products
     * @returns ProductListResponse Product list
     * @throws ApiError
     */
    static getProducts({ xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postProducts({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getProductsPublic({ id, storeId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getProducts1({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchProducts({ id, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static deleteProducts({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.ProductsService = ProductsService;
