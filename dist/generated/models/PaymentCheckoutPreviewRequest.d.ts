export type PaymentCheckoutPreviewRequest = {
    orderId: string;
    fulfillmentType?: 'STANDARD' | 'PICKUP' | null;
    shippingAddressId?: string | null;
    pickupAt?: string | null;
    pickupReadyAt?: string | null;
};
