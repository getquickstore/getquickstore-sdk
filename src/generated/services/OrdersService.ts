/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderSingleResponse } from '../models/OrderSingleResponse';
import type { PayOrderResponse } from '../models/PayOrderResponse';
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
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED',
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
     * Create buyer order
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
