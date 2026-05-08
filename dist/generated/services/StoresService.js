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
     * Update store
     * @returns UpdateStoreResponse Store updated
     * @throws ApiError
     */
    static patchStores({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Get store settings
     * @returns StoreSettingsResponse Store settings
     * @throws ApiError
     */
    static getStoresSettings({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/stores/{id}/settings',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store settings get failed`,
            },
        });
    }
    /**
     * Update store settings
     * @returns StoreSettingsResponse Store settings updated
     * @throws ApiError
     */
    static patchStoresSettings({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/stores/{id}/settings',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store settings update failed`,
            },
        });
    }
    /**
     * Sync store tax settings from Stripe connected account
     * @returns StoreTaxSettingsSyncStripeResponse Tax settings synced from Stripe
     * @throws ApiError
     */
    static postStoresTaxSettingsSyncStripe({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/stores/{id}/tax-settings/sync-stripe',
            path: {
                'id': id,
            },
            errors: {
                400: `Stripe account is not connected`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store tax sync from Stripe failed`,
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
    /**
     * Create store cover upload URL
     * @returns StoreCoverPresignResponse Upload URL created
     * @throws ApiError
     */
    static postStoresCoverPresign({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/stores/{id}/cover/presign',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store cover presign failed`,
            },
        });
    }
    /**
     * Attach uploaded store cover
     * @returns StoreCoverResponse Store cover updated
     * @throws ApiError
     */
    static postStoresCover({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/stores/{id}/cover',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store cover update failed`,
            },
        });
    }
    /**
     * Delete store cover
     * @returns StoreCoverDeleteResponse Store cover deleted
     * @throws ApiError
     */
    static deleteStoresCover({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/stores/{id}/cover',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing or invalid token`,
                404: `Store not found`,
                500: `Store cover delete failed`,
            },
        });
    }
    /**
     * Toggle store public visibility
     * @returns UpdateStoreVisibilityResponse Store visibility updated
     * @throws ApiError
     */
    static patchStoresVisibility({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
}
exports.StoresService = StoresService;
