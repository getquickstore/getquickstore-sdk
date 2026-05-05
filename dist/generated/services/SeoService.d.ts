import type { SeoAdminPagesResponse } from '../models/SeoAdminPagesResponse';
import type { SeoRebuildResponse } from '../models/SeoRebuildResponse';
import type { SeoResponse } from '../models/SeoResponse';
import type { SeoSitemapResponse } from '../models/SeoSitemapResponse';
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
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service, search or micro-search pages.
     * @returns SeoResponse SEO page response
     * @throws ApiError
     */
    static getSeo({ slug, }: {
        slug: string;
    }): CancelablePromise<SeoResponse>;
}
