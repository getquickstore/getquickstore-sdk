import type { CompletePickupByCodeRequest } from '../models/CompletePickupByCodeRequest';
import type { CompletePickupByTokenRequest } from '../models/CompletePickupByTokenRequest';
import type { ConfirmReceivedRequest } from '../models/ConfirmReceivedRequest';
import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { CreateOrderReturnRequest } from '../models/CreateOrderReturnRequest';
import type { CreatePickupTokenResponse } from '../models/CreatePickupTokenResponse';
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderReturnListResponse } from '../models/OrderReturnListResponse';
import type { OrderReturnRefundResponse } from '../models/OrderReturnRefundResponse';
import type { OrderReturnSingleResponse } from '../models/OrderReturnSingleResponse';
import type { OrderReturnStatus } from '../models/OrderReturnStatus';
import type { OrderSingleResponse } from '../models/OrderSingleResponse';
import type { PayOrderResponse } from '../models/PayOrderResponse';
import type { RejectReturnRequest } from '../models/RejectReturnRequest';
import type { ReturnDecisionCommentRequest } from '../models/ReturnDecisionCommentRequest';
import type { ShipOrderRequest } from '../models/ShipOrderRequest';
import type { SubmitReturnShipmentRequest } from '../models/SubmitReturnShipmentRequest';
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
     * List current buyer return requests
     * @returns OrderReturnListResponse Return list
     * @throws ApiError
     */
    static getOrdersReturnsMe({ limit, status, }: {
        limit?: number;
        status?: OrderReturnStatus;
    }): CancelablePromise<OrderReturnListResponse>;
    /**
     * Get return request by id
     * @returns OrderReturnSingleResponse Return details
     * @throws ApiError
     */
    static getOrdersReturns({ returnId, xStoreId, }: {
        returnId: string;
        /**
         * Optional store context id for seller view.
         */
        xStoreId?: string;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * List store return requests
     * @returns OrderReturnListResponse Store return list
     * @throws ApiError
     */
    static getOrdersAdminReturns({ xStoreId, limit, status, orderId, }: {
        xStoreId: string;
        limit?: number;
        status?: OrderReturnStatus;
        orderId?: string;
    }): CancelablePromise<OrderReturnListResponse>;
    /**
     * Request return for completed order
     * @returns OrderReturnSingleResponse Return requested
     * @throws ApiError
     */
    static postOrdersReturns({ id, requestBody, }: {
        id: string;
        requestBody: CreateOrderReturnRequest;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Submit buyer return shipment details
     * @returns OrderReturnSingleResponse Return shipment submitted
     * @throws ApiError
     */
    static postOrdersReturnsShipment({ returnId, requestBody, }: {
        returnId: string;
        requestBody: SubmitReturnShipmentRequest;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Cancel buyer return request
     * @returns OrderReturnSingleResponse Return cancelled
     * @throws ApiError
     */
    static postOrdersReturnsCancel({ returnId, }: {
        returnId: string;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Create or refresh return pickup token
     * @returns CreatePickupTokenResponse Return pickup token created
     * @throws ApiError
     */
    static postOrdersReturnsPickupToken({ returnId, }: {
        returnId: string;
    }): CancelablePromise<CreatePickupTokenResponse>;
    /**
     * Approve return request
     * @returns OrderReturnSingleResponse Return approved
     * @throws ApiError
     */
    static postOrdersAdminReturnsApprove({ returnId, xStoreId, requestBody, }: {
        returnId: string;
        xStoreId: string;
        requestBody?: ReturnDecisionCommentRequest;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Reject return request
     * @returns OrderReturnSingleResponse Return rejected
     * @throws ApiError
     */
    static postOrdersAdminReturnsReject({ returnId, xStoreId, requestBody, }: {
        returnId: string;
        xStoreId: string;
        requestBody?: RejectReturnRequest;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Confirm returned item received by seller
     * @returns OrderReturnSingleResponse Return received
     * @throws ApiError
     */
    static postOrdersAdminReturnsReceived({ returnId, xStoreId, }: {
        returnId: string;
        xStoreId: string;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Create refund after returned item was received
     * @returns OrderReturnRefundResponse Return refund created
     * @throws ApiError
     */
    static postOrdersAdminReturnsRefund({ returnId, xStoreId, }: {
        returnId: string;
        xStoreId: string;
    }): CancelablePromise<OrderReturnRefundResponse>;
    /**
     * Refund buyer without requiring returned item
     * @returns OrderReturnRefundResponse Direct return refund created
     * @throws ApiError
     */
    static postOrdersAdminReturnsRefundDirect({ returnId, xStoreId, }: {
        returnId: string;
        xStoreId: string;
    }): CancelablePromise<OrderReturnRefundResponse>;
    /**
     * Complete return pickup by QR token
     * @returns OrderReturnSingleResponse Return pickup completed
     * @throws ApiError
     */
    static postOrdersAdminReturnsCompleteByToken({ returnId, xStoreId, requestBody, }: {
        returnId: string;
        xStoreId: string;
        requestBody: CompletePickupByTokenRequest;
    }): CancelablePromise<OrderReturnSingleResponse>;
    /**
     * Complete return pickup by 6-digit code
     * @returns OrderReturnSingleResponse Return pickup completed
     * @throws ApiError
     */
    static postOrdersAdminReturnsCompleteByCode({ returnId, xStoreId, requestBody, }: {
        returnId: string;
        xStoreId: string;
        requestBody: CompletePickupByCodeRequest;
    }): CancelablePromise<OrderReturnSingleResponse>;
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
     * Create or refresh pickup token
     * Buyer creates or refreshes a pickup QR token and 6-digit code for a pickup order.
     * @returns CreatePickupTokenResponse Pickup token created
     * @throws ApiError
     */
    static postOrdersPickupToken({ id, }: {
        id: string;
    }): CancelablePromise<CreatePickupTokenResponse>;
    /**
     * Complete pickup order by QR token
     * Seller scans buyer QR token and completes a pickup order.
     * @returns OrderSingleResponse Pickup order completed
     * @throws ApiError
     */
    static postOrdersCompleteByToken({ id, xStoreId, requestBody, }: {
        id: string;
        /**
         * Store context id. Required for seller pickup completion.
         */
        xStoreId: string;
        requestBody: CompletePickupByTokenRequest;
    }): CancelablePromise<OrderSingleResponse>;
    /**
     * Complete pickup order by 6-digit code
     * Seller enters buyer 6-digit pickup code and completes a pickup order.
     * @returns OrderSingleResponse Pickup order completed
     * @throws ApiError
     */
    static postOrdersCompleteByCode({ id, xStoreId, requestBody, }: {
        id: string;
        /**
         * Store context id. Required for seller pickup completion.
         */
        xStoreId: string;
        requestBody: CompletePickupByCodeRequest;
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
