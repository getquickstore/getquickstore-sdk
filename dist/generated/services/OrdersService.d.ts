import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderSingleResponse } from '../models/OrderSingleResponse';
import type { PayOrderResponse } from '../models/PayOrderResponse';
import type { UpdateOrderStatusRequest } from '../models/UpdateOrderStatusRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class OrdersService {
    /**
     * List store orders
     * @returns OrderListResponse Order list
     * @throws ApiError
     */
    static getOrders({ xStoreId, limit, status, paymentStatus, customerId, fulfillmentType, }: {
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
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED';
        /**
         * Filter by payment status
         */
        paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
        /**
         * Filter by customer id
         */
        customerId?: string;
        /**
         * Filter by fulfillment type
         */
        fulfillmentType?: 'STANDARD' | 'PICKUP';
    }): CancelablePromise<OrderListResponse>;
    /**
     * Create order (supports pickup)
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
     * Update order status
     * @returns OrderSingleResponse Order status updated
     * @throws ApiError
     */
    static patchOrdersStatus({ id, xStoreId, requestBody, }: {
        id: string;
        /**
         * Store context id
         */
        xStoreId: string;
        requestBody: UpdateOrderStatusRequest;
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
