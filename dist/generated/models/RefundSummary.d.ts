export type RefundSummary = {
    id: string;
    externalRefundId?: string | null;
    amountCents: number;
    taxRefundedCents?: number;
    stripeTaxTransactionReversalId?: string | null;
    reason?: string | null;
    createdAt: string;
};
