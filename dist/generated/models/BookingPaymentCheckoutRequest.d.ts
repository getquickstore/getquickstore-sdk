export type BookingPaymentCheckoutRequest = {
    bookingId: string;
    successUrl?: string | null;
    cancelUrl?: string | null;
};
