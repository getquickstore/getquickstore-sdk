export type PaymentConflictError = {
    ok: boolean;
    error: string;
    paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | null;
};
