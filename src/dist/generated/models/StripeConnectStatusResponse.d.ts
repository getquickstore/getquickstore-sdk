import type { StoreStripeState } from './StoreStripeState';
export type StripeConnectStatusResponse = {
    ok: boolean;
    storeId: string;
    stripe: StoreStripeState;
};
