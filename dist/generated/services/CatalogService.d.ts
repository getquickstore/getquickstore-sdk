import type { FeaturedCatalogResponse } from '../models/FeaturedCatalogResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class CatalogService {
    /**
     * Public featured catalog
     * List featured published products and active services from public active stores.
     * @returns FeaturedCatalogResponse Featured public catalog
     * @throws ApiError
     */
    static getFeatured({ limit, q, }: {
        limit?: number;
        q?: string;
    }): CancelablePromise<FeaturedCatalogResponse>;
}
