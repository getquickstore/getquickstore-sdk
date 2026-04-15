import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderSingleResponse } from '../models/OrderSingleResponse';
import type { PayOrderResponse } from '../models/PayOrderResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class OrdersService {
    /**
     * List store orders
     * @returns OrderListResponse Order list
     * @throws ApiError
     */
    static getOrders({ xStoreId, limit, status, paymentStatus, customerId, }: {
        /**
         * Store context id
         */
        xStoreId: string;
        /**
         * Maximum number of orders to return
         */
        limit?: number;
        /**
         * Filter by order status
         */
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED';
        /**
         * Filter by payment status
         */
        paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
        /**
         * Filter by customer id
         */
        customerId?: string;
    }): CancelablePromise<OrderListResponse>;
    /**
     * Create order
     * @returns OrderSingleResponse Order created
     * @throws ApiError
     */
    static postOrders({ xStoreId, requestBody, }: {
        /**
         * Store context id
         */
        xStoreId: string;
        requestBody: CreateOrderRequest;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Get order by id
     * @returns OrderSingleResponse Order details
     * @throws ApiError
     */
    static getOrders1({ id, xStoreId, }: {
        id: string;
        /**
         * Store context id
         */
        xStoreId: string;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Cancel order
     * @returns OrderSingleResponse Order cancelled
     * @throws ApiError
     */
    static postOrdersCancel({ id, xStoreId, }: {
        id: string;
        /**
         * Store context id
         */
        xStoreId: string;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Pay order with mock payment
     * @returns PayOrderResponse Payment succeeded
     * @throws ApiError
     */
    static postOrdersPay({ id, xStoreId, }: {
        id: string;
        /**
         * Store context id
         */
        xStoreId: string;
    }): CancelablePromise<PayOrderResponse>;
}
