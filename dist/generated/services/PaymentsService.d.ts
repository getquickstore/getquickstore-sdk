import type { BookingPaymentCheckoutRequest } from '../models/BookingPaymentCheckoutRequest';
import type { BookingSeriesPaymentCheckoutRequest } from '../models/BookingSeriesPaymentCheckoutRequest';
import type { BookingSeriesPaymentCheckoutResponse } from '../models/BookingSeriesPaymentCheckoutResponse';
import type { CreateRefundRequest } from '../models/CreateRefundRequest';
import type { CreateRefundResponse } from '../models/CreateRefundResponse';
import type { PaymentCheckoutRequest } from '../models/PaymentCheckoutRequest';
import type { PaymentCheckoutResponse } from '../models/PaymentCheckoutResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class PaymentsService {
    /**
     * Create Stripe Checkout session for buyer order
     * @returns PaymentCheckoutResponse Checkout session created
     * @throws ApiError
     */
    static postPaymentsCheckout({ requestBody, }: {
        requestBody: PaymentCheckoutRequest;
    }): CancelablePromise<PaymentCheckoutResponse>;
    /**
     * Create Stripe Checkout session for booking
     * @returns PaymentCheckoutResponse Booking checkout session created
     * @throws ApiError
     */
    static postPaymentsBookingsCheckout({ requestBody, }: {
        requestBody: BookingPaymentCheckoutRequest;
    }): CancelablePromise<PaymentCheckoutResponse>;
    /**
     * Create Stripe Checkout session for booking series
     * @returns BookingSeriesPaymentCheckoutResponse Booking series checkout session created
     * @throws ApiError
     */
    static postPaymentsBookingsSeriesCheckout({ requestBody, }: {
        requestBody: BookingSeriesPaymentCheckoutRequest;
    }): CancelablePromise<BookingSeriesPaymentCheckoutResponse>;
    /**
     * Create refund for payment
     * @returns CreateRefundResponse Refund created
     * @throws ApiError
     */
    static postPaymentsRefund({ paymentId, xStoreId, requestBody, }: {
        paymentId: string;
        /**
         * Store context id. If provided, must match the payment store.
         */
        xStoreId?: string;
        requestBody?: CreateRefundRequest;
    }): CancelablePromise<CreateRefundResponse>;
}
