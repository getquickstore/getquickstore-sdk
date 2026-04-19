/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStoreRequest } from '../models/CreateStoreRequest';
import type { CreateStoreResponse } from '../models/CreateStoreResponse';
import type { PublicStore } from '../models/PublicStore';
import type { PublicStoreListResponse } from '../models/PublicStoreListResponse';
import type { StoreDeleteResponse } from '../models/StoreDeleteResponse';
import type { StoreDetailsResponse } from '../models/StoreDetailsResponse';
import type { StoreListResponse } from '../models/StoreListResponse';
import type { StoreSelectResponse } from '../models/StoreSelectResponse';
import type { StoresMeResponse } from '../models/StoresMeResponse';
import type { UpdateStoreRequest } from '../models/UpdateStoreRequest';
import type { UpdateStoreResponse } from '../models/UpdateStoreResponse';
import type { UpdateStoreVisibilityRequest } from '../models/UpdateStoreVisibilityRequest';
import type { UpdateStoreVisibilityResponse } from '../models/UpdateStoreVisibilityResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StoresService {
    /**
     * List accessible stores with billing and Stripe summary
     * @returns StoreListResponse Accessible stores list
     * @throws ApiError
     */
    public static getStores(): CancelablePromise<StoreListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stores',
            errors: {
                401: `Missing or invalid token`,
                500: `Store list failed`,
            },
        });
    }
    /**
     * Create store
     * @returns CreateStoreResponse Store created
     * @throws ApiError
     */
    public static postStores({
        requestBody,
    }: {
        requestBody: CreateStoreRequest,
    }): CancelablePromise<CreateStoreResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stores',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Unauthorized`,
                404: `User not found`,
                409: `Store slug already exists`,
                500: `Store create failed`,
            },
        });
    }
    /**
     * Get current user's stores and default store
     * @returns StoresMeResponse Stores for current user
     * @throws ApiError
     */
    public static getStoresMe(): CancelablePromise<StoresMeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stores/me',
            errors: {
                401: `Missing or invalid token`,
                404: `User not found`,
                500: `Store list failed`,
            },
        });
    }
    /**
     * Get store by id
     * @returns StoreDetailsResponse Store details
     * @throws ApiError
     */
    public static getStores1({
        id,
    }: {
        /**
         * Store id
         */
        id: string,
    }): CancelablePromise<StoreDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stores/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store get failed`,
            },
        });
    }
    /**
     * Update store
     * @returns UpdateStoreResponse Store updated
     * @throws ApiError
     */
    public static patchStores({
        id,
        requestBody,
    }: {
        /**
         * Store id
         */
        id: string,
        requestBody: UpdateStoreRequest,
    }): CancelablePromise<UpdateStoreResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/stores/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Missing or invalid token`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store update failed`,
            },
        });
    }
    /**
     * Archive store
     * Marks store as ARCHIVED and sets deletedAt. If the archived store was the user's default store, defaultStoreId is cleared.
     * @returns StoreDeleteResponse Store archived
     * @throws ApiError
     */
    public static deleteStores({
        id,
    }: {
        /**
         * Store id
         */
        id: string,
    }): CancelablePromise<StoreDeleteResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/stores/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store archive failed`,
            },
        });
    }
    /**
     * Select default store
     * @returns StoreSelectResponse Default store updated
     * @throws ApiError
     */
    public static postStoresSelect({
        id,
    }: {
        /**
         * Store id
         */
        id: string,
    }): CancelablePromise<StoreSelectResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stores/{id}/select',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store select failed`,
            },
        });
    }
    /**
     * Toggle store public visibility
     * @returns UpdateStoreVisibilityResponse Store visibility updated
     * @throws ApiError
     */
    public static patchStoresVisibility({
        id,
        requestBody,
    }: {
        /**
         * Store id
         */
        id: string,
        requestBody: UpdateStoreVisibilityRequest,
    }): CancelablePromise<UpdateStoreVisibilityResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/stores/{id}/visibility',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Missing or invalid token`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store visibility update failed`,
            },
        });
    }
    /**
     * List public stores
     * @returns PublicStoreListResponse Public stores list
     * @throws ApiError
     */
    public static getStoresPublic({
        q,
    }: {
        /**
         * Search by store name or slug
         */
        q?: string,
    }): CancelablePromise<PublicStoreListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stores/public',
            query: {
                'q': q,
            },
        });
    }
    /**
     * Get public store by slug
     * @returns PublicStore Public store details
     * @throws ApiError
     */
    public static getStoresPublic1({
        slug,
    }: {
        /**
         * Store slug
         */
        slug: string,
    }): CancelablePromise<PublicStore> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stores/public/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
}
