/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CategoryListResponse } from '../models/CategoryListResponse';
import type { CreateCategoryRequest } from '../models/CreateCategoryRequest';
import type { OkResponse } from '../models/OkResponse';
import type { UpdateCategoryRequest } from '../models/UpdateCategoryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * List categories
     * @returns CategoryListResponse Category list
     * @throws ApiError
     */
    public static getCategories({
        xStoreId,
        limit = 20,
        offset,
        q,
    }: {
        /**
         * Store context id
         */
        xStoreId?: string,
        /**
         * Max number of categories to return
         */
        limit?: number,
        /**
         * Pagination offset
         */
        offset?: number,
        /**
         * Search by name or slug
         */
        q?: string,
    }): CancelablePromise<CategoryListResponse> {
        return __request(OpenAPI, {
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
    public static postCategories({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateCategoryRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<Category> {
        return __request(OpenAPI, {
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
    public static patchCategories({
        id,
        requestBody,
        xStoreId,
    }: {
        /**
         * Category id
         */
        id: string,
        requestBody: UpdateCategoryRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<Category> {
        return __request(OpenAPI, {
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
    public static deleteCategories({
        id,
        xStoreId,
    }: {
        /**
         * Category id
         */
        id: string,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
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
