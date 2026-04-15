import type { BillingSubscription } from './BillingSubscription';
export type BillingCancelResponse = {
    ok: boolean;
    storeId: string;
    storeStatus: 'PROVISIONING' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
    subscription: BillingSubscription;
};
