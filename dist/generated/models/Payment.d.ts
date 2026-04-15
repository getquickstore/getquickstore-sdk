export type Payment = {
    id: string;
    storeId: string;
    orderId: string;
    bookingId?: string | null;
    provider: string;
    status: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
    amountCents: number;
    amount: number;
    currency: string;
    externalId?: string | null;
    raw?: any;
    refundedCents: number;
    createdAt: string;
    updatedAt: string;
};
