import type { MarketplaceCatalogResponse } from '../models/MarketplaceCatalogResponse';
import type { PublicProductListResponse } from '../models/PublicProductListResponse';
import type { PublicServiceListResponse } from '../models/PublicServiceListResponse';
import type { PublicStoreListResponse } from '../models/PublicStoreListResponse';
import type { PublicStoreNearbyResponse } from '../models/PublicStoreNearbyResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class PublicService {
    /**
     * List public stores
     * @returns PublicStoreListResponse Public stores list
     * @throws ApiError
     */
    static getPublicStores({ q, }: {
        /**
         * Search by store name or slug
         */
        q?: string;
    }): CancelablePromise<PublicStoreListResponse>;
    /**
     * List nearby public stores
     * @returns PublicStoreNearbyResponse Nearby stores list
     * @throws ApiError
     */
    static getPublicStoresNearby({ lat, lng, radiusKm, }: {
        lat: number;
        lng: number;
        radiusKm?: number;
    }): CancelablePromise<PublicStoreNearbyResponse>;
    /**
     * List public products
     * @returns PublicProductListResponse Public products list
     * @throws ApiError
     */
    static getPublicProducts({ storeId, }: {
        storeId?: string;
    }): CancelablePromise<PublicProductListResponse>;
    /**
     * List public services
     * @returns PublicServiceListResponse Public services list
     * @throws ApiError
     */
    static getPublicServices({ storeId, }: {
        storeId?: string;
    }): CancelablePromise<PublicServiceListResponse>;
    /**
     * Get public marketplace catalog
     * @returns MarketplaceCatalogResponse Public catalog
     * @throws ApiError
     */
    static getPublicCatalog(): CancelablePromise<MarketplaceCatalogResponse>;
}
