import type { StoreStripeState } from './StoreStripeState';
export type StripeConnectStartResponse = {
    ok: boolean;
    storeId: string;
    onboardingUrl: string;
    expiresAt?: number | null;
    stripe: StoreStripeState;
};
