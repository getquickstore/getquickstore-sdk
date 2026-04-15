export type CreateRefundRequest = {
    /**
     * If omitted, refunds the remaining refundable amount.
     */
    amountCents?: number | null;
    reason?: string | null;
};
