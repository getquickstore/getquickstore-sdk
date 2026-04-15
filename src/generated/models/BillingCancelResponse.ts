/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingSubscription } from './BillingSubscription';
export type BillingCancelResponse = {
    ok: boolean;
    storeId: string;
    storeStatus: 'PROVISIONING' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
    subscription: BillingSubscription;
};

