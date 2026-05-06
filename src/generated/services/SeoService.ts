/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoAdminPagesResponse } from '../models/SeoAdminPagesResponse';
import type { SeoRebuildResponse } from '../models/SeoRebuildResponse';
import type { SeoResponse } from '../models/SeoResponse';
import type { SeoSitemapResponse } from '../models/SeoSitemapResponse';
import type { StoreSeoSettingsResponse } from '../models/StoreSeoSettingsResponse';
import type { StoreStructuredDataResponse } from '../models/StoreStructuredDataResponse';
import type { UpdateStoreSeoSettingsRequest } from '../models/UpdateStoreSeoSettingsRequest';
import type { UpdateStoreStructuredDataRequest } from '../models/UpdateStoreStructuredDataRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SeoService {
    /**
     * List SEO pages for admin
     * Returns generated SEO pages with filters. Requires SUPER_ADMIN.
     * @returns SeoAdminPagesResponse SEO admin pages
     * @throws ApiError
     */
    public static getSeoAdminPages({
        take = 50,
        type,
        scope,
        city,
        q,
    }: {
        take?: number,
        type?: 'STORE' | 'PRODUCT' | 'SERVICE' | 'SEARCH',
        scope?: string,
        city?: string,
        q?: string,
    }): CancelablePromise<SeoAdminPagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seo/admin/pages',
            query: {
                'take': take,
                'type': type,
                'scope': scope,
                'city': city,
                'q': q,
            },
            errors: {
                403: `Access denied`,
                500: `Admin SEO pages failed`,
            },
        });
    }
    /**
     * Get SEO sitemap items
     * Returns generated SEO pages available for sitemap. noindex pages are excluded.
     * @returns SeoSitemapResponse SEO sitemap response
     * @throws ApiError
     */
    public static getSeoSitemap(): CancelablePromise<SeoSitemapResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seo/sitemap',
            errors: {
                500: `Failed to load sitemap`,
            },
        });
    }
    /**
     * Rebuild generated SEO pages
     * Rebuilds SEO pages for public stores, published products, active services, city pages and micro-search pages. Requires SUPER_ADMIN.
     * @returns SeoRebuildResponse SEO rebuild response
     * @throws ApiError
     */
    public static postSeoRebuild(): CancelablePromise<SeoRebuildResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/seo/rebuild',
            errors: {
                403: `Access denied`,
                500: `Failed to rebuild SEO pages`,
            },
        });
    }
    /**
     * Get store SEO settings
     * @returns StoreSeoSettingsResponse Store SEO settings
     * @throws ApiError
     */
    public static getSeoStores({
        id,
    }: {
        id: string,
    }): CancelablePromise<StoreSeoSettingsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seo/stores/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store SEO get failed`,
            },
        });
    }
    /**
     * Update store SEO settings
     * @returns StoreSeoSettingsResponse Store SEO settings updated
     * @throws ApiError
     */
    public static patchSeoStores({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateStoreSeoSettingsRequest,
    }): CancelablePromise<StoreSeoSettingsResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/seo/stores/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Empty or invalid update`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store SEO update failed`,
            },
        });
    }
    /**
     * Get store structured data settings
     * @returns StoreStructuredDataResponse Store structured data settings
     * @throws ApiError
     */
    public static getSeoStoresStructuredData({
        id,
    }: {
        id: string,
    }): CancelablePromise<StoreStructuredDataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seo/stores/{id}/structured-data',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store structured data get failed`,
            },
        });
    }
    /**
     * Update store structured data settings
     * @returns StoreStructuredDataResponse Store structured data updated
     * @throws ApiError
     */
    public static patchSeoStoresStructuredData({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateStoreStructuredDataRequest,
    }): CancelablePromise<StoreStructuredDataResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/seo/stores/{id}/structured-data',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Empty or invalid update`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store structured data update failed`,
            },
        });
    }
    /**
     * Generate store structured data
     * Generates LocalBusiness JSON-LD, completeness score, validation warnings and rich result signals from store/profile/SEO data.
     * @returns StoreStructuredDataResponse Store structured data generated
     * @throws ApiError
     */
    public static postSeoStoresStructuredDataGenerate({
        id,
    }: {
        id: string,
    }): CancelablePromise<StoreStructuredDataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/seo/stores/{id}/structured-data/generate',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store structured data generate failed`,
            },
        });
    }
    /**
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service, search or micro-search pages.
     * @returns SeoResponse SEO page response
     * @throws ApiError
     */
    public static getSeo({
        slug,
    }: {
        slug: string,
    }): CancelablePromise<SeoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seo/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                400: `Invalid request`,
                404: `SEO page not found`,
                500: `Failed to load SEO page`,
            },
        });
    }
}
