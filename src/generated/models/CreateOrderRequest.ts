/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderItemInput } from './CreateOrderItemInput';
export type CreateOrderRequest = {
    items: Array<CreateOrderItemInput>;
    customerId?: string | null;
    currency?: string;
    notes?: string | null;
    shippingAddressId?: string | null;
    billingAddressId?: string | null;
    discountCents?: number | null;
    shippingCents?: number | null;
    taxCents?: number | null;
};

