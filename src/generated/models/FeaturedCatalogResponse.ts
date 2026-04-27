/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeaturedService } from './FeaturedService';
import type { ProductDetail } from './ProductDetail';
export type FeaturedCatalogResponse = {
    ok: boolean;
    products: Array<ProductDetail>;
    services: Array<FeaturedService>;
    limit: number;
};

