/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceImage } from './ServiceImage';
export type BookingService = {
    id: string;
    storeId: string;
    name: string;
    slug: string;
    description?: string | null;
    durationMin: number;
    price: number;
    priceCents: number;
    currency: string;
    isActive: boolean;
    ratingAvg?: number;
    reviewCount?: number;
    image?: string | null;
    images?: Array<ServiceImage>;
    taxCode?: string | null;
    taxBehavior?: 'inclusive' | 'exclusive' | null;
    subtotalCents: number;
    subtotal: number;
    taxCents: number;
    tax: number;
};

