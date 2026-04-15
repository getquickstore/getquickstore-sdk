export type StoreStripeNotReadyError = {
    ok: boolean;
    error: string;
    stripeStatus?: string | null;
};
