export type PaymentCheckoutPreviewRequest = {
    orderId: string;
    fulfillmentType?: 'STANDARD' | 'PICKUP' | null;
    shippingAddressId?: string | null;
};
