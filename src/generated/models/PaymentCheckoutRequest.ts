/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentCheckoutRequest = {
    orderId: string;
    successUrl?: string | null;
    cancelUrl?: string | null;
    fulfillmentType?: 'STANDARD' | 'PICKUP' | null;
    shippingAddressId?: string | null;
    /**
     * Pickup window start. Required when fulfillmentType is PICKUP.
     */
    pickupAt?: string | null;
    /**
     * Pickup window end when fulfillmentType is PICKUP.
     */
    pickupReadyAt?: string | null;
};

