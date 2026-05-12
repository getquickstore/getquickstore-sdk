import type { CreateStoreReviewRequest } from '../models/CreateStoreReviewRequest';
import type { MarketplaceCatalogResponse } from '../models/MarketplaceCatalogResponse';
import type { OkResponse } from '../models/OkResponse';
import type { PublicCategoryListResponse } from '../models/PublicCategoryListResponse';
import type { PublicCheckoutOrderPreviewResponse } from '../models/PublicCheckoutOrderPreviewResponse';
import type { PublicProductListResponse } from '../models/PublicProductListResponse';
import type { PublicProductResponse } from '../models/PublicProductResponse';
import type { PublicServiceListResponse } from '../models/PublicServiceListResponse';
import type { PublicStore } from '../models/PublicStore';
import type { PublicStoreAllReviewListResponse } from '../models/PublicStoreAllReviewListResponse';
import type { PublicStoreListResponse } from '../models/PublicStoreListResponse';
import type { PublicStoreNearbyResponse } from '../models/PublicStoreNearbyResponse';
import type { PublicStoreReviewCreateResponse } from '../models/PublicStoreReviewCreateResponse';
import type { PublicStoreReviewListResponse } from '../models/PublicStoreReviewListResponse';
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
     * Get public store by slug
     * @returns PublicStore Public store details
     * @throws ApiError
     */
    static getPublicStores1({ slug, }: {
        slug: string;
    }): CancelablePromise<PublicStore>;
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
     * List public store reviews
     * @returns PublicStoreReviewListResponse Store reviews list
     * @throws ApiError
     */
    static getPublicStoresReviews({ id, limit, offset, }: {
        id: string;
        limit?: number;
        offset?: number;
    }): CancelablePromise<PublicStoreReviewListResponse>;
    /**
     * Create public store review
     * @returns PublicStoreReviewCreateResponse Store review created
     * @throws ApiError
     */
    static postPublicStoresReviews({ id, requestBody, }: {
        id: string;
        requestBody: CreateStoreReviewRequest;
    }): CancelablePromise<PublicStoreReviewCreateResponse>;
    /**
     * List aggregated public store reviews
     * @returns PublicStoreAllReviewListResponse Aggregated store reviews list
     * @throws ApiError
     */
    static getPublicStoresAllReviews({ id, limit, offset, }: {
        id: string;
        limit?: number;
        offset?: number;
    }): CancelablePromise<PublicStoreAllReviewListResponse>;
    /**
     * Flag public store review
     * @returns OkResponse Store review flagged
     * @throws ApiError
     */
    static postPublicStoresReviewsFlag({ id, rid, }: {
        id: string;
        rid: string;
    }): CancelablePromise<OkResponse>;
    /**
     * List public products
     * @returns PublicProductListResponse Public products list
     * @throws ApiError
     */
    static getPublicProducts({ storeId, }: {
        storeId?: string;
    }): CancelablePromise<PublicProductListResponse>;
    /**
     * Get public product by id
     * @returns PublicProductResponse Public product details
     * @throws ApiError
     */
    static getPublicProducts1({ id, storeId, }: {
        id: string;
        storeId: string;
    }): CancelablePromise<PublicProductResponse>;
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
    /**
     * Get public checkout order preview
     * @returns PublicCheckoutOrderPreviewResponse Checkout order preview
     * @throws ApiError
     */
    static getPublicCheckoutOrdersPreview({ orderId, }: {
        orderId: string;
    }): CancelablePromise<PublicCheckoutOrderPreviewResponse>;
    /**
     * List public categories
     * @returns PublicCategoryListResponse Public categories list
     * @throws ApiError
     */
    static getPublicCategories({ storeId, }: {
        storeId?: string;
    }): CancelablePromise<PublicCategoryListResponse>;
}
