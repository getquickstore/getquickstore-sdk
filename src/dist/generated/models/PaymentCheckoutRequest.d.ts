export type PaymentCheckoutRequest = {
    orderId: string;
    successUrl?: string | null;
    cancelUrl?: string | null;
};
