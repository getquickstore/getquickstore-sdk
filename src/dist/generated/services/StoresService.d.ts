import type { CreateStoreRequest } from '../models/CreateStoreRequest';
import type { CreateStoreResponse } from '../models/CreateStoreResponse';
import type { StoreListResponse } from '../models/StoreListResponse';
import type { StoresMeResponse } from '../models/StoresMeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class StoresService {
    /**
     * List current user's stores
     * @returns StoreListResponse Store list
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
}
