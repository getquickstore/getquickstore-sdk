/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStoreRequest } from '../models/CreateStoreRequest';
import type { CreateStoreResponse } from '../models/CreateStoreResponse';
import type { StoreDeleteResponse } from '../models/StoreDeleteResponse';
import type { StoreDetailsResponse } from '../models/StoreDetailsResponse';
import type { StoreListResponse } from '../models/StoreListResponse';
import type { StoreSelectResponse } from '../models/StoreSelectResponse';
import type { StoresMeResponse } from '../models/StoresMeResponse';
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
}
