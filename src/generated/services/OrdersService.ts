/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * List buyer orders or store orders
     * @returns OrderListResponse Order list
     * @throws ApiError
     */
    public static getOrders({
        xStoreId,
        limit = 20,
        status,
        paymentStatus,
        customerId,
        fulfillmentType,
    }: {
        /**
         * Optional store context id. If provided, lists store orders for seller. Otherwise lists buyer orders.
         */
        xStoreId?: string,
        limit?: number,
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'SHIPPED' | 'DELIVERED' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED',
        paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED',
        customerId?: string,
        fulfillmentType?: 'STANDARD' | 'PICKUP',
    }): CancelablePromise<OrderListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'limit': limit,
                'status': status,
                'paymentStatus': paymentStatus,
                'customerId': customerId,
                'fulfillmentType': fulfillmentType,
            },
            errors: {
                403: `Access denied`,
                500: `Order list failed`,
            },
        });
    }
    /**
     * Create customer order for store checkout
     * @returns OrderSingleResponse Order created
     * @throws ApiError
     */
    public static postOrders({
        requestBody,
    }: {
        requestBody: CreateOrderRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                404: `Product or variant not found`,
                409: `Conflict`,
                500: `Order create failed`,
            },
        });
    }
    /**
     * List current buyer return requests
     * @returns OrderReturnListResponse Return list
     * @throws ApiError
     */
    public static getOrdersReturnsMe({
        limit = 20,
        status,
    }: {
        limit?: number,
        status?: OrderReturnStatus,
    }): CancelablePromise<OrderReturnListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/returns/me',
            query: {
                'limit': limit,
                'status': status,
            },
            errors: {
                500: `Return list failed`,
            },
        });
    }
    /**
     * Get return request by id
     * @returns OrderReturnSingleResponse Return details
     * @throws ApiError
     */
    public static getOrdersReturns({
        returnId,
        xStoreId,
    }: {
        returnId: string,
        /**
         * Optional store context id for seller view.
         */
        xStoreId?: string,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/returns/{returnId}',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                404: `Return not found`,
                500: `Return get failed`,
            },
        });
    }
    /**
     * List store return requests
     * @returns OrderReturnListResponse Store return list
     * @throws ApiError
     */
    public static getOrdersAdminReturns({
        xStoreId,
        limit = 50,
        status,
        orderId,
    }: {
        xStoreId: string,
        limit?: number,
        status?: OrderReturnStatus,
        orderId?: string,
    }): CancelablePromise<OrderReturnListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/admin/returns',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'limit': limit,
                'status': status,
                'orderId': orderId,
            },
            errors: {
                403: `Access denied`,
                500: `Admin return list failed`,
            },
        });
    }
    /**
     * Request return for completed order
     * @returns OrderReturnSingleResponse Return requested
     * @throws ApiError
     */
    public static postOrdersReturns({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: CreateOrderReturnRequest,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/returns',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                404: `Order not found`,
                409: `Return not available`,
            },
        });
    }
    /**
     * Submit buyer return shipment details
     * @returns OrderReturnSingleResponse Return shipment submitted
     * @throws ApiError
     */
    public static postOrdersReturnsShipment({
        returnId,
        requestBody,
    }: {
        returnId: string,
        requestBody: SubmitReturnShipmentRequest,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/returns/{returnId}/shipment',
            path: {
                'returnId': returnId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Shipment info required`,
                409: `Return shipment not allowed`,
            },
        });
    }
    /**
     * Cancel buyer return request
     * @returns OrderReturnSingleResponse Return cancelled
     * @throws ApiError
     */
    public static postOrdersReturnsCancel({
        returnId,
    }: {
        returnId: string,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/returns/{returnId}/cancel',
            path: {
                'returnId': returnId,
            },
            errors: {
                409: `Return cannot be cancelled`,
            },
        });
    }
    /**
     * Create or refresh return pickup token
     * @returns CreatePickupTokenResponse Return pickup token created
     * @throws ApiError
     */
    public static postOrdersReturnsPickupToken({
        returnId,
    }: {
        returnId: string,
    }): CancelablePromise<CreatePickupTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/returns/{returnId}/pickup-token',
            path: {
                'returnId': returnId,
            },
            errors: {
                409: `Return pickup token not available`,
            },
        });
    }
    /**
     * Approve return request
     * @returns OrderReturnSingleResponse Return approved
     * @throws ApiError
     */
    public static postOrdersAdminReturnsApprove({
        returnId,
        xStoreId,
        requestBody,
    }: {
        returnId: string,
        xStoreId: string,
        requestBody?: ReturnDecisionCommentRequest,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/approve',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Return cannot be approved`,
            },
        });
    }
    /**
     * Reject return request
     * @returns OrderReturnSingleResponse Return rejected
     * @throws ApiError
     */
    public static postOrdersAdminReturnsReject({
        returnId,
        xStoreId,
        requestBody,
    }: {
        returnId: string,
        xStoreId: string,
        requestBody?: RejectReturnRequest,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/reject',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Return cannot be rejected`,
            },
        });
    }
    /**
     * Confirm returned item received by seller
     * @returns OrderReturnSingleResponse Return received
     * @throws ApiError
     */
    public static postOrdersAdminReturnsReceived({
        returnId,
        xStoreId,
    }: {
        returnId: string,
        xStoreId: string,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/received',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                409: `Return cannot be received`,
            },
        });
    }
    /**
     * Create refund after returned item was received
     * @returns OrderReturnRefundResponse Return refund created
     * @throws ApiError
     */
    public static postOrdersAdminReturnsRefund({
        returnId,
        xStoreId,
    }: {
        returnId: string,
        xStoreId: string,
    }): CancelablePromise<OrderReturnRefundResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/refund',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                409: `Return refund not allowed`,
            },
        });
    }
    /**
     * Refund buyer without requiring returned item
     * @returns OrderReturnRefundResponse Direct return refund created
     * @throws ApiError
     */
    public static postOrdersAdminReturnsRefundDirect({
        returnId,
        xStoreId,
    }: {
        returnId: string,
        xStoreId: string,
    }): CancelablePromise<OrderReturnRefundResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/refund-direct',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                409: `Direct return refund not allowed`,
            },
        });
    }
    /**
     * Complete return pickup by QR token
     * @returns OrderReturnSingleResponse Return pickup completed
     * @throws ApiError
     */
    public static postOrdersAdminReturnsCompleteByToken({
        returnId,
        xStoreId,
        requestBody,
    }: {
        returnId: string,
        xStoreId: string,
        requestBody: CompletePickupByTokenRequest,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/complete-by-token',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Complete return pickup by 6-digit code
     * @returns OrderReturnSingleResponse Return pickup completed
     * @throws ApiError
     */
    public static postOrdersAdminReturnsCompleteByCode({
        returnId,
        xStoreId,
        requestBody,
    }: {
        returnId: string,
        xStoreId: string,
        requestBody: CompletePickupByCodeRequest,
    }): CancelablePromise<OrderReturnSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/admin/returns/{returnId}/complete-by-code',
            path: {
                'returnId': returnId,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get order by id
     * @returns OrderSingleResponse Order details
     * @throws ApiError
     */
    public static getOrders1({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Optional store context id for seller view. Buyer can access own order without it.
         */
        xStoreId?: string,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                403: `Access denied`,
                404: `Order not found`,
                500: `Order get failed`,
            },
        });
    }
    /**
     * Update store order status
     * @returns OrderSingleResponse Order status updated
     * @throws ApiError
     */
    public static patchOrdersStatus({
        id,
        xStoreId,
        requestBody,
    }: {
        id: string,
        /**
         * Store context id. Required for seller/admin status updates.
         */
        xStoreId: string,
        requestBody: UpdateOrderStatusRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/orders/{id}/status',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                404: `Order not found`,
                500: `Order status update failed`,
            },
        });
    }
    /**
     * Cancel buyer order or store order
     * @returns OrderSingleResponse Order cancelled
     * @throws ApiError
     */
    public static postOrdersCancel({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Optional store context id for seller cancellation. Buyer can cancel own pending order without it.
         */
        xStoreId?: string,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/cancel',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                403: `Access denied`,
                404: `Order not found`,
                409: `Order cannot be cancelled`,
                500: `Order cancel failed`,
            },
        });
    }
    /**
     * Confirm seller order
     * Seller confirms paid/pending order and moves it to processing.
     * @returns OrderSingleResponse Order confirmed
     * @throws ApiError
     */
    public static postOrdersConfirm({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Store context id. Required for seller confirmation.
         */
        xStoreId: string,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/confirm',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                403: `Access denied`,
                404: `Order not found`,
                409: `Order cannot be confirmed`,
                500: `Order confirm failed`,
            },
        });
    }
    /**
     * Add seller shipment details
     * Seller adds tracking number and/or shipment receipt photo and marks order as shipped.
     * @returns OrderSingleResponse Shipment added
     * @throws ApiError
     */
    public static postOrdersShip({
        id,
        xStoreId,
        requestBody,
    }: {
        id: string,
        /**
         * Store context id. Required for seller shipment update.
         */
        xStoreId: string,
        requestBody: ShipOrderRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/ship',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Shipment info required`,
                403: `Access denied`,
                404: `Order not found`,
                409: `Order cannot be shipped`,
                500: `Order ship failed`,
            },
        });
    }
    /**
     * Confirm buyer received order
     * Buyer confirms that shipped order was received. This closes the fulfillment flow and unlocks store review.
     * @returns OrderSingleResponse Order received confirmed
     * @throws ApiError
     */
    public static postOrdersConfirmReceived({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: ConfirmReceivedRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/confirm-received',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Access denied`,
                404: `Order not found`,
                409: `Order cannot be confirmed received`,
                500: `Order confirm received failed`,
            },
        });
    }
    /**
     * Create or refresh pickup token
     * Buyer creates or refreshes a pickup QR token and 6-digit code for a pickup order.
     * @returns CreatePickupTokenResponse Pickup token created
     * @throws ApiError
     */
    public static postOrdersPickupToken({
        id,
    }: {
        id: string,
    }): CancelablePromise<CreatePickupTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/pickup-token',
            path: {
                'id': id,
            },
            errors: {
                404: `Order not found`,
                409: `Pickup token not available`,
                500: `Pickup token creation failed`,
            },
        });
    }
    /**
     * Complete pickup order by QR token
     * Seller scans buyer QR token and completes a pickup order.
     * @returns OrderSingleResponse Pickup order completed
     * @throws ApiError
     */
    public static postOrdersCompleteByToken({
        id,
        xStoreId,
        requestBody,
    }: {
        id: string,
        /**
         * Store context id. Required for seller pickup completion.
         */
        xStoreId: string,
        requestBody: CompletePickupByTokenRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/complete-by-token',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Token required`,
                403: `Access denied`,
                404: `Order or pickup token not found`,
                409: `Invalid or expired pickup token`,
                500: `Pickup completion by token failed`,
            },
        });
    }
    /**
     * Complete pickup order by 6-digit code
     * Seller enters buyer 6-digit pickup code and completes a pickup order.
     * @returns OrderSingleResponse Pickup order completed
     * @throws ApiError
     */
    public static postOrdersCompleteByCode({
        id,
        xStoreId,
        requestBody,
    }: {
        id: string,
        /**
         * Store context id. Required for seller pickup completion.
         */
        xStoreId: string,
        requestBody: CompletePickupByCodeRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/complete-by-code',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Code required`,
                403: `Access denied`,
                404: `Order or pickup token not found`,
                409: `Invalid or expired pickup code`,
                500: `Pickup completion by code failed`,
            },
        });
    }
    /**
     * Pay buyer order with mock payment
     * @returns PayOrderResponse Payment succeeded
     * @throws ApiError
     */
    public static postOrdersPay({
        id,
    }: {
        id: string,
    }): CancelablePromise<PayOrderResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/pay',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied`,
                404: `Order not found`,
                409: `Order already paid or cancelled`,
                500: `Order pay failed`,
            },
        });
    }
}
