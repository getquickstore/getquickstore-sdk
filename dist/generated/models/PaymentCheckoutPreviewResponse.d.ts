export type PaymentCheckoutPreviewResponse = {
    ok: boolean;
    orderId: string;
    fulfillmentType: 'STANDARD' | 'PICKUP';
    shippingAddressId?: string | null;
    subtotalCents: number;
    discountCents: number;
    shippingCents: number;
    taxCents: number;
    totalCents: number;
    currency: string;
    taxStatus: 'CALCULATED' | 'STRIPE_REQUIRED' | 'DISABLED' | 'ADDRESS_REQUIRED';
    taxEnabled: boolean;
    taxBehavior: 'inclusive' | 'exclusive';
    taxLiability: 'SELLER' | 'PLATFORM';
};
