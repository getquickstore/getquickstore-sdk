/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { OrderCustomer } from './OrderCustomer';
import type { OrderItem } from './OrderItem';
import type { OrderStoreRef } from './OrderStoreRef';
import type { Payment } from './Payment';
export type Order = {
    id: string;
    storeId: string;
    store: OrderStoreRef;
    customerId?: string | null;
    userId?: string | null;
    number: string;
    status: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED';
    paymentStatus: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
    fulfillmentType: 'STANDARD' | 'PICKUP';
    fulfillmentMeta?: any;
    pickupAt?: string | null;
    pickupReadyAt?: string | null;
    completedAt?: string | null;
    currency: string;
    subtotalCents: number;
    discountCents: number;
    shippingCents: number;
    taxCents: number;
    totalCents: number;
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    notes?: string | null;
    shippingAddressId?: string | null;
    billingAddressId?: string | null;
    createdAt: string;
    updatedAt: string;
    cancelledAt?: string | null;
    customer?: OrderCustomer | null;
    shippingAddress?: Address | null;
    billingAddress?: Address | null;
    items: Array<OrderItem>;
    payments?: Array<Payment>;
};

