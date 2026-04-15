/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCategoryLink } from './ProductCategoryLink';
import type { ProductImage } from './ProductImage';
export type ProductDetail = {
    id: string;
    storeId: string;
    brandId?: string | null;
    name: string;
    slug: string;
    sku?: string | null;
    description?: string | null;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    priceCents: number;
    price: number;
    currency: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    noindex: boolean;
    createdAt: string;
    updatedAt: string;
    images: Array<ProductImage>;
    categories?: Array<ProductCategoryLink>;
};

