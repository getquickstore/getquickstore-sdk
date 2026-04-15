import type { BillingPlan } from './BillingPlan';
export type BillingPlansResponse = {
    ok: boolean;
    items: Array<BillingPlan>;
};
