/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoCategory } from './SeoCategory';
import type { SeoImage } from './SeoImage';
import type { SeoStore } from './SeoStore';
import type { SeoTag } from './SeoTag';
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
    categories?: Array<SeoCategory>;
    tags?: Array<SeoTag>;
    store?: SeoStore | null;
};

