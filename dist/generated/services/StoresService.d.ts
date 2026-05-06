import type { CreateStoreRequest } from '../models/CreateStoreRequest';
import type { CreateStoreResponse } from '../models/CreateStoreResponse';
import type { StoreCoverAttachRequest } from '../models/StoreCoverAttachRequest';
import type { StoreCoverDeleteResponse } from '../models/StoreCoverDeleteResponse';
import type { StoreCoverPresignRequest } from '../models/StoreCoverPresignRequest';
import type { StoreCoverPresignResponse } from '../models/StoreCoverPresignResponse';
import type { StoreCoverResponse } from '../models/StoreCoverResponse';
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
export declare class StoresService {
    /**
     * List accessible stores with billing and Stripe summary
     * @returns StoreListResponse Accessible stores list
     * @throws ApiError
     */
    static getStores(): CancelablePromise<StoreListResponse>;
    /**
     * Create store
     * @returns CreateStoreResponse Store created
     * @throws ApiError
     */
    static postStores({ requestBody, }: {
        requestBody: CreateStoreRequest;
    }): CancelablePromise<CreateStoreResponse>;
    /**
     * Get current user's stores and default store
     * @returns StoresMeResponse Stores for current user
     * @throws ApiError
     */
    static getStoresMe(): CancelablePromise<StoresMeResponse>;
    /**
     * Get store by id
     * @returns StoreDetailsResponse Store details
     * @throws ApiError
     */
    static getStores1({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StoreDetailsResponse>;
    /**
     * Update store
     * @returns UpdateStoreResponse Store updated
     * @throws ApiError
     */
    static patchStores({ id, requestBody, }: {
        /**
         * Store id
         */
        id: string;
        requestBody: UpdateStoreRequest;
    }): CancelablePromise<UpdateStoreResponse>;
    /**
     * Archive store
     * Marks store as ARCHIVED and sets deletedAt. If the archived store was the user's default store, defaultStoreId is cleared.
     * @returns StoreDeleteResponse Store archived
     * @throws ApiError
     */
    static deleteStores({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StoreDeleteResponse>;
    /**
     * Select default store
     * @returns StoreSelectResponse Default store updated
     * @throws ApiError
     */
    static postStoresSelect({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StoreSelectResponse>;
    /**
     * Create store cover upload URL
     * @returns StoreCoverPresignResponse Upload URL created
     * @throws ApiError
     */
    static postStoresCoverPresign({ id, requestBody, }: {
        /**
         * Store id
         */
        id: string;
        requestBody: StoreCoverPresignRequest;
    }): CancelablePromise<StoreCoverPresignResponse>;
    /**
     * Attach uploaded store cover
     * @returns StoreCoverResponse Store cover updated
     * @throws ApiError
     */
    static postStoresCover({ id, requestBody, }: {
        /**
         * Store id
         */
        id: string;
        requestBody: StoreCoverAttachRequest;
    }): CancelablePromise<StoreCoverResponse>;
    /**
     * Delete store cover
     * @returns StoreCoverDeleteResponse Store cover deleted
     * @throws ApiError
     */
    static deleteStoresCover({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StoreCoverDeleteResponse>;
    /**
     * Toggle store public visibility
     * @returns UpdateStoreVisibilityResponse Store visibility updated
     * @throws ApiError
     */
    static patchStoresVisibility({ id, requestBody, }: {
        /**
         * Store id
         */
        id: string;
        requestBody: UpdateStoreVisibilityRequest;
    }): CancelablePromise<UpdateStoreVisibilityResponse>;
}
