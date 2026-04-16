import type { CreateStoreRequest } from '../models/CreateStoreRequest';
import type { CreateStoreResponse } from '../models/CreateStoreResponse';
import type { StoreDeleteResponse } from '../models/StoreDeleteResponse';
import type { StoreDetailsResponse } from '../models/StoreDetailsResponse';
import type { StoreListResponse } from '../models/StoreListResponse';
import type { StoreSelectResponse } from '../models/StoreSelectResponse';
import type { StoresMeResponse } from '../models/StoresMeResponse';
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
}
