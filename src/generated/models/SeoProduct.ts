/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoImage } from './SeoImage';
import type { SeoStore } from './SeoStore';
export type SeoProduct = {
    id?: string;
    storeId?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    status?: string;
    priceCents?: number;
    price?: number;
    currency?: string;
    ratingAvg?: number;
    reviewCount?: number;
    image?: string | null;
    images?: Array<SeoImage>;
    store?: SeoStore | null;
};

