/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStoreReviewRequest } from '../models/CreateStoreReviewRequest';
import type { MarketplaceCatalogResponse } from '../models/MarketplaceCatalogResponse';
import type { OkResponse } from '../models/OkResponse';
import type { PublicCategoryListResponse } from '../models/PublicCategoryListResponse';
import type { PublicProductListResponse } from '../models/PublicProductListResponse';
import type { PublicServiceListResponse } from '../models/PublicServiceListResponse';
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
        });
    }
}
