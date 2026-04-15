export type RefundedPaymentSummary = {
    id: string;
    status: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
    refundedCents: number;
};
