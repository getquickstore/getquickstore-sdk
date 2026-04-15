/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderProductRef } from './OrderProductRef';
import type { OrderVariantRef } from './OrderVariantRef';
export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    variantId?: string | null;
    qty: number;
    priceCents: number;
    price: number;
    sku?: string | null;
    title?: string | null;
    createdAt: string;
    product?: OrderProductRef;
    variant?: OrderVariantRef | null;
};

