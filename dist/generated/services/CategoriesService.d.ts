import type { Category } from '../models/Category';
import type { CategoryListResponse } from '../models/CategoryListResponse';
import type { CreateCategoryRequest } from '../models/CreateCategoryRequest';
import type { OkResponse } from '../models/OkResponse';
import type { UpdateCategoryRequest } from '../models/UpdateCategoryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class CategoriesService {
    /**
     * List categories
     * @returns CategoryListResponse Category list
     * @throws ApiError
     */
    static getCategories({ xStoreId, limit, offset, q, }: {
        /**
         * Store context id
         */
        xStoreId?: string;
        /**
         * Max number of categories to return
         */
        limit?: number;
        /**
         * Pagination offset
         */
        offset?: number;
        /**
         * Search by name or slug
         */
        q?: string;
    }): CancelablePromise<CategoryListResponse>;
    /**
     * Create category
     * @returns Category Category created
     * @throws ApiError
     */
    static postCategories({ requestBody, xStoreId, }: {
        requestBody: CreateCategoryRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<Category>;
    /**
     * Update category
     * @returns Category Updated category
     * @throws ApiError
     */
    static patchCategories({ id, requestBody, xStoreId, }: {
        /**
         * Category id
         */
        id: string;
        requestBody: UpdateCategoryRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<Category>;
    /**
     * Delete category and detach products
     * @returns OkResponse Category soft-deleted and product links removed
     * @throws ApiError
     */
    static deleteCategories({ id, xStoreId, }: {
        /**
         * Category id
         */
        id: string;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<OkResponse>;
}
