/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RefundedPaymentSummary } from './RefundedPaymentSummary';
import type { RefundSummary } from './RefundSummary';
export type CreateRefundResponse = {
    ok: boolean;
    refundId: string;
    refund: RefundSummary;
    payment: RefundedPaymentSummary;
};

