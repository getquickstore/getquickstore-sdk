export type RefundSummary = {
    id: string;
    externalRefundId?: string | null;
    amountCents: number;
    reason?: string | null;
    createdAt: string;
};
