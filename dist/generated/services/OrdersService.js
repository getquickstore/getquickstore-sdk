"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class OrdersService {
    /**
     * List buyer orders or store orders
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
     * Create customer order for store checkout
     * @returns OrderSingleResponse Order created
     * @throws ApiError
     */
    static postOrders({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Update store order status
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
     * Cancel buyer order or store order
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
     * Confirm seller order
     * Seller confirms paid/pending order and moves it to processing.
     * @returns OrderSingleResponse Order confirmed
     * @throws ApiError
     */
    static postOrdersConfirm({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postOrdersShip({ id, xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postOrdersConfirmReceived({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Pay buyer order with mock payment
     * @returns PayOrderResponse Payment succeeded
     * @throws ApiError
     */
    static postOrdersPay({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.OrdersService = OrdersService;
