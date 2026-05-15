/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderReturn } from './OrderReturn';
import type { StoreReturnPolicy } from './StoreReturnPolicy';
export type OrderReturnConflictResponse = {
    ok: boolean;
    error: string;
    status?: string | null;
    paymentStatus?: string | null;
    fulfillmentType?: string | null;
    completedAt?: string | null;
    returnWindowDays?: number | null;
    returnDeadline?: string | null;
    returnPolicy?: StoreReturnPolicy | null;
    item?: OrderReturn | null;
};

