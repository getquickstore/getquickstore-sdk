/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductImageInput } from './CreateProductImageInput';
export type CreateProductRequest = {
    brandId?: string | null;
    categoryId?: string | null;
    categoryIds?: Array<string>;
    name: string;
    slug?: string | null;
    sku?: string | null;
    description?: string | null;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    /**
     * Human-readable price. Converted to priceCents if priceCents is not provided.
     */
    price?: number | null;
    /**
     * Price in minor units. Has priority over price.
     */
    priceCents?: number | null;
    currency?: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    noindex?: boolean;
    images?: Array<CreateProductImageInput>;
};

