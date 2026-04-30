"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CategoriesService {
    /**
     * List categories
     * @returns CategoryListResponse Category list
     * @throws ApiError
     */
    static getCategories({ xStoreId, limit = 20, offset, q, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/categories',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'limit': limit,
                'offset': offset,
                'q': q,
            },
            errors: {
                403: `Access denied`,
                500: `Failed to list categories`,
            },
        });
    }
    /**
     * Create category
     * @returns Category Category created
     * @throws ApiError
     */
    static postCategories({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/categories',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                403: `Access denied`,
                404: `Parent category not found`,
                409: `Unique constraint failed`,
                500: `Failed to create category`,
            },
        });
    }
    /**
     * Update category
     * @returns Category Updated category
     * @throws ApiError
     */
    static patchCategories({ id, requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                403: `Access denied`,
                404: `Category or parent category not found`,
                409: `Unique constraint failed`,
                500: `Failed to update category`,
            },
        });
    }
    /**
     * Delete category and detach products
     * @returns OkResponse Category soft-deleted and product links removed
     * @throws ApiError
     */
    static deleteCategories({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                403: `Access denied`,
                404: `Category not found`,
                500: `Failed to delete category`,
            },
        });
    }
}
exports.CategoriesService = CategoriesService;
