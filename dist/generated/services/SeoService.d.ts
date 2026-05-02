import type { SeoRebuildResponse } from '../models/SeoRebuildResponse';
import type { SeoResponse } from '../models/SeoResponse';
import type { SeoSitemapResponse } from '../models/SeoSitemapResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SeoService {
    /**
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service or search pages.
     * @returns SeoResponse SEO page response
     * @throws ApiError
     */
    static getSeo({ slug, }: {
        slug: string;
    }): CancelablePromise<SeoResponse>;
    /**
     * Get SEO sitemap items
     * Returns generated SEO pages available for sitemap. noindex pages are excluded.
     * @returns SeoSitemapResponse SEO sitemap response
     * @throws ApiError
     */
    static getSeoSitemap(): CancelablePromise<SeoSitemapResponse>;
    /**
     * Rebuild generated SEO pages
     * Rebuilds generated SEO pages for public stores, published products, active services and search pages. Requires SUPER_ADMIN.
     * @returns SeoRebuildResponse SEO rebuild response
     * @throws ApiError
     */
    static postSeoRebuild(): CancelablePromise<SeoRebuildResponse>;
}
