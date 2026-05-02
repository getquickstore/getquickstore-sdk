"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class BookingsService {
    /**
     * List bookings
     * Returns bookings for the current store context. Requires x-store-id. Intended for seller/admin calendar and booking management.
     * @returns BookingListResponse Booking list
     * @throws ApiError
     */
    static getBookings({ xStoreId, status, serviceId, dateFrom, dateTo, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/bookings',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'status': status,
                'serviceId': serviceId,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied for current store`,
                404: `Related resource not found`,
                500: `Failed to list bookings`,
            },
        });
    }
    /**
     * Create booking
     * Creates a booking for a store service. Requires authenticated customer and x-store-id. Customer does not need seller access to the store. End time is calculated automatically from service duration.
     * @returns Booking Booking created
     * @throws ApiError
     */
    static postBookings({ xStoreId, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                404: `Service or store not found`,
                409: `Booking conflict`,
                500: `Failed to create booking`,
            },
        });
    }
    /**
     * List my bookings
     * Returns bookings created by the authenticated customer across all stores. Does not require x-store-id.
     * @returns BookingListResponse Customer booking list
     * @throws ApiError
     */
    static getBookingsMe() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/bookings/me',
            errors: {
                401: `Authentication required`,
                500: `Failed to list customer bookings`,
            },
        });
    }
    /**
     * Preview custom booking series
     * Calculates custom date/time booking slots, conflicts and total price without creating bookings.
     * @returns CustomBookingSeriesPreviewResponse Custom series preview
     * @throws ApiError
     */
    static postBookingsSeriesCustomPreview({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/series/custom/preview',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                404: `Service not found`,
                409: `Slot unavailable`,
                500: `Preview failed`,
            },
        });
    }
    /**
     * Create custom booking series
     * Creates a booking series from explicitly selected dates and times.
     * @returns BookingSeries Custom series created
     * @throws ApiError
     */
    static postBookingsSeriesCustom({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/series/custom',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                404: `Service not found`,
                409: `Series has conflicts`,
                500: `Create failed`,
            },
        });
    }
    /**
     * Preview booking series
     * Calculates recurring booking slots, conflicts and total price without creating bookings.
     * @returns BookingSeriesPreviewResponse Series preview
     * @throws ApiError
     */
    static postBookingsSeriesPreview({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/series/preview',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                404: `Service not found`,
                500: `Preview failed`,
            },
        });
    }
    /**
     * Create booking series
     * Creates a booking series and all concrete booking slots.
     * @returns BookingSeries Series created
     * @throws ApiError
     */
    static postBookingsSeries({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/series',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                409: `Series has conflicts`,
                500: `Create failed`,
            },
        });
    }
    /**
     * List booking series for store
     * Returns booking series for the current store context.
     * @returns BookingSeriesListResponse Series list
     * @throws ApiError
     */
    static getBookingsSeries({ xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/bookings/series',
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied`,
                500: `List failed`,
            },
        });
    }
    /**
     * List my booking series
     * Returns recurring booking series created by the authenticated customer.
     * @returns BookingSeriesListResponse Customer series list
     * @throws ApiError
     */
    static getBookingsSeriesMe() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/bookings/series/me',
            errors: {
                401: `Authentication required`,
                500: `List failed`,
            },
        });
    }
    /**
     * Get booking series
     * Returns one booking series with its concrete bookings.
     * @returns BookingSeries Series details
     * @throws ApiError
     */
    static getBookingsSeries1({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/bookings/series/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                404: `Series not found`,
                500: `Get failed`,
            },
        });
    }
    /**
     * Cancel booking series
     * Cancels the series and future active bookings in it.
     * @returns BookingSeries Series cancelled
     * @throws ApiError
     */
    static postBookingsSeriesCancel({ xStoreId, id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/series/{id}/cancel',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied`,
                404: `Series not found`,
                409: `Series already cancelled`,
                500: `Cancel failed`,
            },
        });
    }
    /**
     * Get booking by id
     * Returns a single booking from the current store context.
     * @returns Booking Booking details
     * @throws ApiError
     */
    static getBookings1({ xStoreId, id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/bookings/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied for current store`,
                404: `Booking not found`,
                500: `Failed to get booking`,
            },
        });
    }
    /**
     * Update booking
     * Updates booking status, payment status, or customer fields. Intended for seller/admin booking management.
     * @returns Booking Booking updated
     * @throws ApiError
     */
    static patchBookings({ xStoreId, id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/bookings/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                403: `Access denied for current store`,
                404: `Booking not found`,
                409: `Booking state conflict`,
                500: `Failed to update booking`,
            },
        });
    }
    /**
     * Generate booking completion token
     * Generates a short-lived token and code for booking completion. Intended for customer device (QR / code display).
     * @returns BookingCompletionTokenResponse Completion token generated
     * @throws ApiError
     */
    static postBookingsCompletionToken({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/{id}/completion-token',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid request`,
                401: `Unauthorized`,
                404: `Booking not found`,
                409: `Booking already completed`,
            },
        });
    }
    /**
     * Complete booking by token (QR)
     * Completes booking using QR token. Intended for seller/admin scan flow.
     * @returns Booking Booking completed
     * @throws ApiError
     */
    static postBookingsCompleteByToken({ xStoreId, id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/{id}/complete-by-token',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid token`,
                403: `Access denied`,
                404: `Booking not found`,
                409: `Already completed`,
            },
        });
    }
    /**
     * Complete booking by code
     * Completes booking using manual code input (fallback when QR is unavailable).
     * @returns Booking Booking completed
     * @throws ApiError
     */
    static postBookingsCompleteByCode({ xStoreId, id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/{id}/complete-by-code',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid code`,
                403: `Access denied`,
                404: `Booking not found`,
                409: `Already completed`,
            },
        });
    }
    /**
     * Reschedule booking
     * Moves a single active booking to another available time slot.
     * @returns Booking Booking rescheduled
     * @throws ApiError
     */
    static postBookingsReschedule({ xStoreId, id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/{id}/reschedule',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                403: `Access denied`,
                404: `Booking not found`,
                409: `Slot busy or booking immutable`,
                500: `Reschedule failed`,
            },
        });
    }
    /**
     * Cancel booking
     * Marks booking as CANCELLED.
     * @returns Booking Booking cancelled
     * @throws ApiError
     */
    static postBookingsCancel({ xStoreId, id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/bookings/{id}/cancel',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Invalid request`,
                403: `Access denied for current store`,
                404: `Booking not found`,
                409: `Booking already cancelled`,
                500: `Failed to cancel booking`,
            },
        });
    }
}
exports.BookingsService = BookingsService;
