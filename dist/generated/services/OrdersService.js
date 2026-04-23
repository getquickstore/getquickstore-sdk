"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class OrdersService {
    /**
     * List store orders
     * @returns OrderListResponse Order list
     * @throws ApiError
     */
    static getOrders({ xStoreId, limit = 20, status, paymentStatus, customerId, fulfillmentType, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postOrders({ xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getOrders1({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchOrdersStatus({ id, xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postOrdersCancel({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postOrdersPay({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.OrdersService = OrdersService;
