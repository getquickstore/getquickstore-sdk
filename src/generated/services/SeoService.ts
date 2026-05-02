/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoRebuildResponse } from '../models/SeoRebuildResponse';
import type { SeoResponse } from '../models/SeoResponse';
import type { SeoSitemapResponse } from '../models/SeoSitemapResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SeoService {
    /**
     * Get SEO page by slug
     * Returns generated SEO metadata and page payload for store, product, service or search pages.
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
     * Rebuilds generated SEO pages for public stores, published products, active services and search pages. Requires SUPER_ADMIN.
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
}
