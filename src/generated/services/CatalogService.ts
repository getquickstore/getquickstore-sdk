/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeaturedCatalogResponse } from '../models/FeaturedCatalogResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CatalogService {
    /**
     * Public featured catalog
     * List featured published products and active services from public active stores.
     * @returns FeaturedCatalogResponse Featured public catalog
     * @throws ApiError
     */
    public static getFeatured({
        limit = 12,
        q,
    }: {
        limit?: number,
        q?: string,
    }): CancelablePromise<FeaturedCatalogResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/featured',
            query: {
                'limit': limit,
                'q': q,
            },
            errors: {
                500: `Featured catalog failed`,
            },
        });
    }
}
