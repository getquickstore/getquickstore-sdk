import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderSingleResponse } from '../models/OrderSingleResponse';
import type { PayOrderResponse } from '../models/PayOrderResponse';
import type { UpdateOrderStatusRequest } from '../models/UpdateOrderStatusRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class OrdersService {
    /**
     * List buyer orders or store orders
     * @returns OrderListResponse Order list
     * @throws ApiError
     */
    static getOrders({ xStoreId, limit, status, paymentStatus, customerId, fulfillmentType, }: {
        /**
         * Optional store context id. If provided, lists store orders for seller. Otherwise lists buyer orders.
         */
        xStoreId?: string;
        limit?: number;
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED';
        paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
        customerId?: string;
        fulfillmentType?: 'STANDARD' | 'PICKUP';
    }): CancelablePromise<OrderListResponse>;
    /**
     * Create buyer order
     * @returns OrderSingleResponse Order created
     * @throws ApiError
     */
    static postOrders({ requestBody, }: {
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
         * Optional store context id for seller view. Buyer can access own order without it.
         */
        xStoreId?: string;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Update store order status
     * @returns OrderSingleResponse Order status updated
     * @throws ApiError
     */
    static patchOrdersStatus({ id, xStoreId, requestBody, }: {
        id: string;
        /**
         * Store context id. Required for seller/admin status updates.
         */
        xStoreId: string;
        requestBody: UpdateOrderStatusRequest;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Cancel buyer order or store order
     * @returns OrderSingleResponse Order cancelled
     * @throws ApiError
     */
    static postOrdersCancel({ id, xStoreId, }: {
        id: string;
        /**
         * Optional store context id for seller cancellation. Buyer can cancel own pending order without it.
         */
        xStoreId?: string;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Pay buyer order with mock payment
     * @returns PayOrderResponse Payment succeeded
     * @throws ApiError
     */
    static postOrdersPay({ id, }: {
        id: string;
    }): CancelablePromise<PayOrderResponse>;
}
