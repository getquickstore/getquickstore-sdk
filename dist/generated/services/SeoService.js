"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SeoService {
    /**
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service or search pages.
     * @returns SeoResponse SEO page response
     * @throws ApiError
     */
    static getSeo({ slug, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    /**
     * Get SEO sitemap items
     * Returns generated SEO pages available for sitemap. noindex pages are excluded.
     * @returns SeoSitemapResponse SEO sitemap response
     * @throws ApiError
     */
    static getSeoSitemap() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/seo/sitemap',
            errors: {
                500: `Failed to load sitemap`,
            },
        });
    }
    /**
     * Rebuild generated SEO pages
     * Rebuilds generated SEO pages for public stores, published products, active services and search pages. Requires SUPER_ADMIN.
     * @returns SeoRebuildResponse SEO rebuild response
     * @throws ApiError
     */
    static postSeoRebuild() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/seo/rebuild',
            errors: {
                403: `Access denied`,
                500: `Failed to rebuild SEO pages`,
            },
        });
    }
}
exports.SeoService = SeoService;
