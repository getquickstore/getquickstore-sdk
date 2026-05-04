import type { ConfirmReceivedRequest } from '../models/ConfirmReceivedRequest';
import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderSingleResponse } from '../models/OrderSingleResponse';
import type { PayOrderResponse } from '../models/PayOrderResponse';
import type { ShipOrderRequest } from '../models/ShipOrderRequest';
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
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'SHIPPED' | 'DELIVERED' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED';
        paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
        customerId?: string;
        fulfillmentType?: 'STANDARD' | 'PICKUP';
    }): CancelablePromise<OrderListResponse>;
    /**
     * Create customer order for store checkout
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
     * Cancel buyer order after abandoned checkout
     * Marks a pending unpaid buyer order as cancelled when checkout was abandoned or cancelled before payment.
     * @returns OrderSingleResponse Order checkout cancelled
     * @throws ApiError
     */
    static postOrdersCheckoutCancel({ id, }: {
        id: string;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Confirm seller order
     * Seller confirms paid/pending order and moves it to processing.
     * @returns OrderSingleResponse Order confirmed
     * @throws ApiError
     */
    static postOrdersConfirm({ id, xStoreId, }: {
        id: string;
        /**
         * Store context id. Required for seller confirmation.
         */
        xStoreId: string;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Add seller shipment details
     * Seller adds tracking number and/or shipment receipt photo and marks order as shipped.
     * @returns OrderSingleResponse Shipment added
     * @throws ApiError
     */
    static postOrdersShip({ id, xStoreId, requestBody, }: {
        id: string;
        /**
         * Store context id. Required for seller shipment update.
         */
        xStoreId: string;
        requestBody: ShipOrderRequest;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Confirm buyer received order
     * Buyer confirms that shipped order was received. This closes the fulfillment flow and unlocks store review.
     * @returns OrderSingleResponse Order received confirmed
     * @throws ApiError
     */
    static postOrdersConfirmReceived({ id, requestBody, }: {
        id: string;
        requestBody?: ConfirmReceivedRequest;
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
