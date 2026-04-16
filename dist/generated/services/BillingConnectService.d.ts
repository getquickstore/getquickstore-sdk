import type { StripeConnectStatusResponse } from '../models/StripeConnectStatusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class BillingConnectService {
    /**
     * Disconnect Stripe account from store
     * Disconnects the current Stripe Connect account from the store and resets Stripe onboarding/payment capability flags.
     * @returns any Stripe disconnected successfully
     * @throws ApiError
     */
    static postBillingStoresStripeDisconnect({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<{
        ok?: boolean;
        storeId?: string;
        stripe?: {
            stripeAccountId?: string | null;
            stripeStatus?: string;
            stripeOnboardingComplete?: boolean;
            stripeDetailsSubmitted?: boolean;
            stripeChargesEnabled?: boolean;
            stripePayoutsEnabled?: boolean;
            stripeRequirementsJson?: any;
        };
    }>;
    /**
     * Get Stripe Connect status for a store
     * @returns StripeConnectStatusResponse Stripe Connect status returned
     * @throws ApiError
     */
    static getBillingStoresStripeConnectStatus({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StripeConnectStatusResponse>;
    /**
     * Force sync Stripe Connect state for a store
     * @returns StripeConnectStatusResponse Stripe Connect state synced successfully
     * @throws ApiError
     */
    static postBillingStoresStripeConnectSync({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StripeConnectStatusResponse>;
}
