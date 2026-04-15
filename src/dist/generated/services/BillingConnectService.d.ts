import type { StripeConnectStartResponse } from '../models/StripeConnectStartResponse';
import type { StripeConnectStatusResponse } from '../models/StripeConnectStatusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class BillingConnectService {
    /**
     * Start Stripe Connect onboarding for a store
     * @returns StripeConnectStartResponse Stripe Connect onboarding link created
     * @throws ApiError
     */
    static postBillingStoresStripeConnectStart({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<StripeConnectStartResponse>;
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
