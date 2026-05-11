import type { SeoAdminPagesResponse } from '../models/SeoAdminPagesResponse';
import type { SeoRebuildResponse } from '../models/SeoRebuildResponse';
import type { SeoResponse } from '../models/SeoResponse';
import type { SeoSitemapResponse } from '../models/SeoSitemapResponse';
import type { StoreSeoRebuildResponse } from '../models/StoreSeoRebuildResponse';
import type { StoreSeoSettingsResponse } from '../models/StoreSeoSettingsResponse';
import type { StoreStructuredDataResponse } from '../models/StoreStructuredDataResponse';
import type { UpdateStoreSeoSettingsRequest } from '../models/UpdateStoreSeoSettingsRequest';
import type { UpdateStoreStructuredDataRequest } from '../models/UpdateStoreStructuredDataRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SeoService {
    /**
     * List SEO pages for admin
     * Returns generated SEO pages with filters. Requires SUPER_ADMIN.
     * @returns SeoAdminPagesResponse SEO admin pages
     * @throws ApiError
     */
    static getSeoAdminPages({ take, type, scope, city, q, }: {
        take?: number;
        type?: 'STORE' | 'PRODUCT' | 'SERVICE' | 'SEARCH';
        scope?: string;
        city?: string;
        q?: string;
    }): CancelablePromise<SeoAdminPagesResponse>;
    /**
     * Get SEO sitemap items
     * Returns generated SEO pages available for sitemap. noindex pages are excluded.
     * @returns SeoSitemapResponse SEO sitemap response
     * @throws ApiError
     */
    static getSeoSitemap(): CancelablePromise<SeoSitemapResponse>;
    /**
     * Rebuild generated SEO pages
     * Rebuilds SEO pages for public stores, published products, active services, city pages and micro-search pages. Requires SUPER_ADMIN.
     * @returns SeoRebuildResponse SEO rebuild response
     * @throws ApiError
     */
    static postSeoRebuild(): CancelablePromise<SeoRebuildResponse>;
    /**
     * Get store SEO settings
     * @returns StoreSeoSettingsResponse Store SEO settings
     * @throws ApiError
     */
    static getSeoStores({ id, }: {
        id: string;
    }): CancelablePromise<StoreSeoSettingsResponse>;
    /**
     * Update store SEO settings
     * @returns StoreSeoSettingsResponse Store SEO settings updated
     * @throws ApiError
     */
    static patchSeoStores({ id, requestBody, }: {
        id: string;
        requestBody: UpdateStoreSeoSettingsRequest;
    }): CancelablePromise<StoreSeoSettingsResponse>;
    /**
     * Get store structured data settings
     * @returns StoreStructuredDataResponse Store structured data settings
     * @throws ApiError
     */
    static getSeoStoresStructuredData({ id, }: {
        id: string;
    }): CancelablePromise<StoreStructuredDataResponse>;
    /**
     * Update store structured data settings
     * @returns StoreStructuredDataResponse Store structured data updated
     * @throws ApiError
     */
    static patchSeoStoresStructuredData({ id, requestBody, }: {
        id: string;
        requestBody: UpdateStoreStructuredDataRequest;
    }): CancelablePromise<StoreStructuredDataResponse>;
    /**
     * Generate store structured data
     * Generates LocalBusiness JSON-LD, completeness score, validation warnings and rich result signals from store/profile/SEO data.
     * @returns StoreStructuredDataResponse Store structured data generated
     * @throws ApiError
     */
    static postSeoStoresStructuredDataGenerate({ id, }: {
        id: string;
    }): CancelablePromise<StoreStructuredDataResponse>;
    /**
     * Rebuild public SEO page for one store
     * Builds or rebuilds the generated public SEO page for a single store. Requires authenticated store OWNER.
     * @returns StoreSeoRebuildResponse Store SEO page rebuilt
     * @throws ApiError
     */
    static postSeoStoresRebuild({ id, }: {
        id: string;
    }): CancelablePromise<StoreSeoRebuildResponse>;
    /**
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service, search or micro-search pages.
     * @returns SeoResponse SEO page response
     * @throws ApiError
     */
    static getSeo({ slug, }: {
        slug: string;
    }): CancelablePromise<SeoResponse>;
}
