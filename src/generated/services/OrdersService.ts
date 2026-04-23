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
     * List store orders
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
         * Store context id
         */
        xStoreId: string,
        /**
         * Maximum number of orders to return
         */
        limit?: number,
        /**
         * Filter by order status
         */
        status?: 'PENDING' | 'PAID' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED' | 'REFUNDED',
        /**
         * Filter by payment status
         */
        paymentStatus?: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED',
        /**
         * Filter by customer id
         */
        customerId?: string,
        /**
         * Filter by fulfillment type
         */
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
     * Create order (supports pickup)
     * @returns OrderSingleResponse Order created
     * @throws ApiError
     */
    public static postOrders({
        xStoreId,
        requestBody,
    }: {
        /**
         * Store context id
         */
        xStoreId: string,
        requestBody: CreateOrderRequest,
    }): CancelablePromise<OrderSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                403: `Access denied`,
                404: `Product or variant not found`,
                409: `Unique constraint failed`,
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
         * Store context id
         */
        xStoreId: string,
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
     * Update order status
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
         * Store context id
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
     * Cancel order
     * @returns OrderSingleResponse Order cancelled
     * @throws ApiError
     */
    public static postOrdersCancel({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Store context id
         */
        xStoreId: string,
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
     * Pay order with mock payment
     * @returns PayOrderResponse Payment succeeded
     * @throws ApiError
     */
    public static postOrdersPay({
        id,
        xStoreId,
    }: {
        id: string,
        /**
         * Store context id
         */
        xStoreId: string,
    }): CancelablePromise<PayOrderResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/{id}/pay',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
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
