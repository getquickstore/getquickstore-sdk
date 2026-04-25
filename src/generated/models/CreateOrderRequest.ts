/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderItemInput } from './CreateOrderItemInput';
export type CreateOrderRequest = {
    /**
     * Store id where the buyer creates the order. Required for customer checkout flow.
     */
    storeId: string;
    items: Array<CreateOrderItemInput>;
    customerId?: string | null;
    currency?: string;
    notes?: string | null;
    fulfillmentType?: 'STANDARD' | 'PICKUP';
    /**
     * Required when fulfillmentType is PICKUP
     */
    pickupAt?: string | null;
    /**
     * Optional fulfillment metadata
     */
    fulfillmentMeta?: any;
    shippingAddressId?: string | null;
    billingAddressId?: string | null;
    discountCents?: number | null;
    shippingCents?: number | null;
    taxCents?: number | null;
};

