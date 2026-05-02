import type { RefundedPaymentSummary } from './RefundedPaymentSummary';
import type { RefundSummary } from './RefundSummary';
export type CreateRefundResponse = {
    ok: boolean;
    refundId: string;
    refund: RefundSummary;
    payment: RefundedPaymentSummary;
};
