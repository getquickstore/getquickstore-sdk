/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentStatus } from './PaymentStatus';
export type RefundedPaymentSummary = {
    id: string;
    status: PaymentStatus;
    refundedCents: number;
    subtotalCents?: number;
    taxCents?: number;
    totalCents?: number;
    stripeCheckoutSessionId?: string | null;
    stripePaymentIntentId?: string | null;
    stripeTaxTransactionId?: string | null;
};

