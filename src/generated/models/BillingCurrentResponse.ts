/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingPlan } from './BillingPlan';
import type { BillingSubscription } from './BillingSubscription';
import type { BillingSummary } from './BillingSummary';
export type BillingCurrentResponse = {
    ok: boolean;
    storeId: string;
    storeStatus: 'PROVISIONING' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
    plan: BillingPlan;
    subscription: BillingSubscription;
    billing: BillingSummary;
};

