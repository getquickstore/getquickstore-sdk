/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoImage } from './SeoImage';
import type { SeoStore } from './SeoStore';
export type SeoServiceItem = {
    id?: string;
    storeId?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    durationMin?: number;
    priceCents?: number;
    price?: number;
    currency?: string;
    ratingAvg?: number;
    reviewCount?: number;
    isActive?: boolean;
    image?: string | null;
    images?: Array<SeoImage>;
    store?: SeoStore | null;
};

