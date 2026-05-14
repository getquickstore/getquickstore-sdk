/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from './Order';
import type { OrderReturnStatus } from './OrderReturnStatus';
import type { OrderStoreRef } from './OrderStoreRef';
import type { Payment } from './Payment';
import type { ReturnReason } from './ReturnReason';
export type OrderReturn = {
    id: string;
    storeId: string;
    orderId: string;
    paymentId?: string | null;
    refundId?: string | null;
    status: OrderReturnStatus;
    reason: ReturnReason;
    comment?: string | null;
    buyerPhotos?: Array<string> | null;
    sellerDecisionComment?: string | null;
    sellerRejectReason?: string | null;
    carrier?: string | null;
    trackingNumber?: string | null;
    shipmentProofUrl?: string | null;
    shippedAt?: string | null;
    receivedAt?: string | null;
    requestedByUserId?: string | null;
    decidedByUserId?: string | null;
    receivedByUserId?: string | null;
    requestedAt: string;
    decidedAt?: string | null;
    approvedAt?: string | null;
    rejectedAt?: string | null;
    refundedAt?: string | null;
    cancelledAt?: string | null;
    createdAt: string;
    updatedAt: string;
    order?: Order | null;
    payment?: Payment | null;
    refund?: any;
    store?: OrderStoreRef | null;
};

