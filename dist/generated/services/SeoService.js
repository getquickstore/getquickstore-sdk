"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SeoService {
    /**
     * List SEO pages for admin
     * Returns generated SEO pages with filters. Requires SUPER_ADMIN.
     * @returns SeoAdminPagesResponse SEO admin pages
     * @throws ApiError
     */
    static getSeoAdminPages({ take = 50, type, scope, city, q, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Rebuilds SEO pages for public stores, published products, active services, city pages and micro-search pages. Requires SUPER_ADMIN.
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
    /**
     * Get store SEO settings
     * @returns StoreSeoSettingsResponse Store SEO settings
     * @throws ApiError
     */
    static getSeoStores({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchSeoStores({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getSeoStoresStructuredData({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchSeoStoresStructuredData({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postSeoStoresStructuredDataGenerate({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Rebuild public SEO page for one store
     * Builds or rebuilds the generated public SEO page for a single store. Requires authenticated store OWNER.
     * @returns StoreSeoRebuildResponse Store SEO page rebuilt
     * @throws ApiError
     */
    static postSeoStoresRebuild({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/seo/stores/{id}/rebuild',
            path: {
                'id': id,
            },
            errors: {
                400: `Store is not public or cannot be rebuilt`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Store not found`,
                500: `Store SEO rebuild failed`,
            },
        });
    }
    /**
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service, search or micro-search pages.
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
}
exports.SeoService = SeoService;
