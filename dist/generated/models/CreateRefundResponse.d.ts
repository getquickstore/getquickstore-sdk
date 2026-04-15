import type { RefundedPaymentSummary } from './RefundedPaymentSummary';
export type CreateRefundResponse = {
    ok: boolean;
    refundId: string;
    payment: RefundedPaymentSummary;
};
