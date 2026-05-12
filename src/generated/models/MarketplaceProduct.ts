/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PublicProductImage } from './PublicProductImage';
export type MarketplaceProduct = {
    id: string;
    title: string;
    description?: string | null;
    shortDescription?: string | null;
    price: number;
    priceCents: number;
    currency?: string | null;
    storeId: string;
    storeName?: string | null;
    storeSlug?: string | null;
    image?: string | null;
    status?: string | null;
    ratingAvg: number;
    reviewCount: number;
    images?: Array<PublicProductImage>;
};

