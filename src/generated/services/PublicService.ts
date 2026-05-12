/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PublicService {
    /**
     * List public stores
     * @returns PublicStoreListResponse Public stores list
     * @throws ApiError
     */
    public static getPublicStores({
        q,
    }: {
        /**
         * Search by store name or slug
         */
        q?: string,
    }): CancelablePromise<PublicStoreListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/stores',
            query: {
                'q': q,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get public store by slug
     * @returns PublicStore Public store details
     * @throws ApiError
     */
    public static getPublicStores1({
        slug,
    }: {
        slug: string,
    }): CancelablePromise<PublicStore> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/stores/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List nearby public stores
     * @returns PublicStoreNearbyResponse Nearby stores list
     * @throws ApiError
     */
    public static getPublicStoresNearby({
        lat,
        lng,
        radiusKm = 25,
    }: {
        lat: number,
        lng: number,
        radiusKm?: number,
    }): CancelablePromise<PublicStoreNearbyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/stores/nearby',
            query: {
                'lat': lat,
                'lng': lng,
                'radiusKm': radiusKm,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public store reviews
     * @returns PublicStoreReviewListResponse Store reviews list
     * @throws ApiError
     */
    public static getPublicStoresReviews({
        id,
        limit = 20,
        offset,
    }: {
        id: string,
        limit?: number,
        offset?: number,
    }): CancelablePromise<PublicStoreReviewListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/stores/{id}/reviews',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create public store review
     * @returns PublicStoreReviewCreateResponse Store review created
     * @throws ApiError
     */
    public static postPublicStoresReviews({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: CreateStoreReviewRequest,
    }): CancelablePromise<PublicStoreReviewCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/public/stores/{id}/reviews',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List aggregated public store reviews
     * @returns PublicStoreAllReviewListResponse Aggregated store reviews list
     * @throws ApiError
     */
    public static getPublicStoresAllReviews({
        id,
        limit = 50,
        offset,
    }: {
        id: string,
        limit?: number,
        offset?: number,
    }): CancelablePromise<PublicStoreAllReviewListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/stores/{id}/all-reviews',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Flag public store review
     * @returns OkResponse Store review flagged
     * @throws ApiError
     */
    public static postPublicStoresReviewsFlag({
        id,
        rid,
    }: {
        id: string,
        rid: string,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/public/stores/{id}/reviews/{rid}/flag',
            path: {
                'id': id,
                'rid': rid,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public products
     * @returns PublicProductListResponse Public products list
     * @throws ApiError
     */
    public static getPublicProducts({
        storeId,
    }: {
        storeId?: string,
    }): CancelablePromise<PublicProductListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/products',
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get public product by id
     * @returns PublicProductResponse Public product details
     * @throws ApiError
     */
    public static getPublicProducts1({
        id,
        storeId,
    }: {
        id: string,
        storeId: string,
    }): CancelablePromise<PublicProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/products/{id}',
            path: {
                'id': id,
            },
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public services
     * @returns PublicServiceListResponse Public services list
     * @throws ApiError
     */
    public static getPublicServices({
        storeId,
    }: {
        storeId?: string,
    }): CancelablePromise<PublicServiceListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/services',
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get public marketplace catalog
     * @returns MarketplaceCatalogResponse Public catalog
     * @throws ApiError
     */
    public static getPublicCatalog(): CancelablePromise<MarketplaceCatalogResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/catalog',
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get public checkout order preview
     * @returns PublicCheckoutOrderPreviewResponse Checkout order preview
     * @throws ApiError
     */
    public static getPublicCheckoutOrdersPreview({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<PublicCheckoutOrderPreviewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/checkout/orders/{orderId}/preview',
            path: {
                'orderId': orderId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public categories
     * @returns PublicCategoryListResponse Public categories list
     * @throws ApiError
     */
    public static getPublicCategories({
        storeId,
    }: {
        storeId?: string,
    }): CancelablePromise<PublicCategoryListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/categories',
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
}
