"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class StoresService {
    /**
     * List accessible stores with billing and Stripe summary
     * @returns StoreListResponse Accessible stores list
     * @throws ApiError
     */
    static getStores() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postStores({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getStoresMe() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getStores1({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static deleteStores({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postStoresSelect({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.StoresService = StoresService;
