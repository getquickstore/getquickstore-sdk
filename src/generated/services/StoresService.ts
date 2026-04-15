/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStoreRequest } from '../models/CreateStoreRequest';
import type { CreateStoreResponse } from '../models/CreateStoreResponse';
import type { StoreListResponse } from '../models/StoreListResponse';
import type { StoresMeResponse } from '../models/StoresMeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StoresService {
    /**
     * List current user's stores
     * @returns StoreListResponse Store list
     * @throws ApiError
     */
    public static getStores(): CancelablePromise<StoreListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stores',
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
        });
    }
}
