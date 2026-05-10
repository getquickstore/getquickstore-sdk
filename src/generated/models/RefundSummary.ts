/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RefundSummary = {
    id: string;
    externalRefundId?: string | null;
    amountCents: number;
    taxRefundedCents?: number;
    stripeTaxTransactionReversalId?: string | null;
    reason?: string | null;
    status: 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED';
    createdAt: string;
};

