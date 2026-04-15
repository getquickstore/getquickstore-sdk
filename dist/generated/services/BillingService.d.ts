import type { BillingCancelRequest } from '../models/BillingCancelRequest';
import type { BillingCancelResponse } from '../models/BillingCancelResponse';
import type { BillingCheckoutRequest } from '../models/BillingCheckoutRequest';
import type { BillingCheckoutResponse } from '../models/BillingCheckoutResponse';
import type { BillingCurrentResponse } from '../models/BillingCurrentResponse';
import type { BillingPlansResponse } from '../models/BillingPlansResponse';
import type { BillingPortalRequest } from '../models/BillingPortalRequest';
import type { BillingPortalResponse } from '../models/BillingPortalResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class BillingService {
    /**
     * List available billing plans
     * @returns BillingPlansResponse Available plans
     * @throws ApiError
     */
    static getBillingPlans(): CancelablePromise<BillingPlansResponse>;
    /**
     * Get current billing state for the user's current or latest owned store
     * @returns BillingCurrentResponse Current billing state
     * @throws ApiError
     */
    static getBillingCurrent({ xStoreId, storeId, }: {
        /**
         * Store context id. Can also be passed as query param storeId.
         */
        xStoreId?: string;
        /**
         * Store id. Optional if x-store-id header or user defaultStoreId is available.
         */
        storeId?: string;
    }): CancelablePromise<BillingCurrentResponse>;
    /**
     * Get current billing state for a specific store
     * @returns BillingCurrentResponse Current billing state
     * @throws ApiError
     */
    static getBillingStoresCurrent({ id, }: {
        /**
         * Store id
         */
        id: string;
    }): CancelablePromise<BillingCurrentResponse>;
    /**
     * Create Stripe Checkout session for store subscription
     * @returns BillingCheckoutResponse Checkout session created
     * @throws ApiError
     */
    static postBillingCheckout({ requestBody, }: {
        requestBody?: BillingCheckoutRequest;
    }): CancelablePromise<BillingCheckoutResponse>;
    /**
     * Create Stripe customer portal session for store subscription
     * @returns BillingPortalResponse Portal session created
     * @throws ApiError
     */
    static postBillingPortal({ requestBody, }: {
        requestBody?: BillingPortalRequest;
    }): CancelablePromise<BillingPortalResponse>;
    /**
     * Cancel store subscription
     * @returns BillingCancelResponse Subscription cancelled
     * @throws ApiError
     */
    static postBillingCancel({ requestBody, }: {
        requestBody?: BillingCancelRequest;
    }): CancelablePromise<BillingCancelResponse>;
}
