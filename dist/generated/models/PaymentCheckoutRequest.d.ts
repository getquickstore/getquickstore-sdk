export type PaymentCheckoutRequest = {
    orderId: string;
    successUrl?: string | null;
    cancelUrl?: string | null;
    fulfillmentType?: 'STANDARD' | 'PICKUP' | null;
    shippingAddressId?: string | null;
};
