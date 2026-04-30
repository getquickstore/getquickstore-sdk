/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceTag } from './ServiceTag';
export type Service = {
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
    reviewCount: number;
    ratingAvg: number;
    tags: Array<ServiceTag>;
    tagIds: Array<string>;
    createdAt?: string | null;
    updatedAt?: string | null;
};

