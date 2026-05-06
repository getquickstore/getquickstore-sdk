import type { StripeConnectReuseRequest } from '../models/StripeConnectReuseRequest';
import type { StripeConnectReuseResponse } from '../models/StripeConnectReuseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class StripeConnectService {
    /**
     * Reuse existing Stripe account for store
     * @returns StripeConnectReuseResponse Stripe account reused
     * @throws ApiError
     */
    static postBillingStoresStripeConnectReuse({ id, requestBody, }: {
        id: string;
        requestBody: StripeConnectReuseRequest;
    }): CancelablePromise<StripeConnectReuseResponse>;
}
