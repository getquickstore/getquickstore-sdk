import type { CreateRefundRequest } from '../models/CreateRefundRequest';
import type { CreateRefundResponse } from '../models/CreateRefundResponse';
import type { PaymentCheckoutRequest } from '../models/PaymentCheckoutRequest';
import type { PaymentCheckoutResponse } from '../models/PaymentCheckoutResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class PaymentsService {
    /**
     * Create Stripe Checkout session for an order
     * @returns PaymentCheckoutResponse Checkout session created
     * @throws ApiError
     */
    static postPaymentsCheckout({ requestBody, xStoreId, }: {
        requestBody: PaymentCheckoutRequest;
        /**
         * Store context id. If provided, must match the order store.
         */
        xStoreId?: string;
    }): CancelablePromise<PaymentCheckoutResponse>;
    /**
     * Create refund for payment
     * @returns CreateRefundResponse Refund created
     * @throws ApiError
     */
    static postPaymentsRefund({ paymentId, xStoreId, requestBody, }: {
        /**
         * Payment id
         */
        paymentId: string;
        /**
         * Store context id. If provided, must match the payment store.
         */
        xStoreId?: string;
        requestBody?: CreateRefundRequest;
    }): CancelablePromise<CreateRefundResponse>;
}
