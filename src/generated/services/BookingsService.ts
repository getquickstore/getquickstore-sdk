/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { BookingCompletionTokenResponse } from '../models/BookingCompletionTokenResponse';
import type { BookingListResponse } from '../models/BookingListResponse';
import type { BookingSeries } from '../models/BookingSeries';
import type { BookingSeriesListResponse } from '../models/BookingSeriesListResponse';
import type { BookingSeriesPreviewRequest } from '../models/BookingSeriesPreviewRequest';
import type { BookingSeriesPreviewResponse } from '../models/BookingSeriesPreviewResponse';
import type { CreateBookingRequest } from '../models/CreateBookingRequest';
import type { CreateBookingSeriesRequest } from '../models/CreateBookingSeriesRequest';
import type { CreateCustomBookingSeriesRequest } from '../models/CreateCustomBookingSeriesRequest';
import type { CustomBookingSeriesPreviewRequest } from '../models/CustomBookingSeriesPreviewRequest';
import type { CustomBookingSeriesPreviewResponse } from '../models/CustomBookingSeriesPreviewResponse';
import type { RescheduleBookingRequest } from '../models/RescheduleBookingRequest';
import type { UpdateBookingRequest } from '../models/UpdateBookingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingsService {
    /**
     * List bookings
     * Returns bookings for the current store context. Requires x-store-id. Intended for seller/admin calendar and booking management.
     * @returns BookingListResponse Booking list
     * @throws ApiError
     */
    public static getBookings({
        xStoreId,
        status,
        serviceId,
        dateFrom,
        dateTo,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Filter by booking status
         */
        status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
        /**
         * Filter by service id in the current store
         */
        serviceId?: string,
        /**
         * Filter bookings with startAt >= dateFrom
         */
        dateFrom?: string,
        /**
         * Filter bookings with startAt <= dateTo
         */
        dateTo?: string,
    }): CancelablePromise<BookingListResponse> {
        return __request(OpenAPI, {
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
     * Creates a booking for a store service. Authenticated customer is linked to Booking.userId and Customer. Store can be provided by x-store-id or request body storeId. End time is calculated automatically from service duration.
     * @returns Booking Booking created
     * @throws ApiError
     */
    public static postBookings({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateBookingRequest,
        /**
         * Store context id.
         */
        xStoreId?: string,
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
     * Returns bookings for the authenticated customer across all stores. Matches by Booking.userId, linked Customer.userId, and customer email. Does not require x-store-id.
     * @returns BookingListResponse Customer booking list
     * @throws ApiError
     */
    public static getBookingsMe(): CancelablePromise<BookingListResponse> {
        return __request(OpenAPI, {
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
    public static postBookingsSeriesCustomPreview({
        requestBody,
        xStoreId,
    }: {
        requestBody: CustomBookingSeriesPreviewRequest,
        xStoreId?: string,
    }): CancelablePromise<CustomBookingSeriesPreviewResponse> {
        return __request(OpenAPI, {
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
    public static postBookingsSeriesCustom({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateCustomBookingSeriesRequest,
        xStoreId?: string,
    }): CancelablePromise<BookingSeries> {
        return __request(OpenAPI, {
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
    public static postBookingsSeriesPreview({
        requestBody,
        xStoreId,
    }: {
        requestBody: BookingSeriesPreviewRequest,
        xStoreId?: string,
    }): CancelablePromise<BookingSeriesPreviewResponse> {
        return __request(OpenAPI, {
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
    public static postBookingsSeries({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateBookingSeriesRequest,
        xStoreId?: string,
    }): CancelablePromise<BookingSeries> {
        return __request(OpenAPI, {
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
    public static getBookingsSeries({
        xStoreId,
    }: {
        xStoreId: string,
    }): CancelablePromise<BookingSeriesListResponse> {
        return __request(OpenAPI, {
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
    public static getBookingsSeriesMe(): CancelablePromise<BookingSeriesListResponse> {
        return __request(OpenAPI, {
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
    public static getBookingsSeries1({
        id,
        xStoreId,
    }: {
        id: string,
        xStoreId?: string,
    }): CancelablePromise<BookingSeries> {
        return __request(OpenAPI, {
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
    public static postBookingsSeriesCancel({
        xStoreId,
        id,
    }: {
        xStoreId: string,
        id: string,
    }): CancelablePromise<BookingSeries> {
        return __request(OpenAPI, {
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
    public static getBookings1({
        xStoreId,
        id,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Booking id
         */
        id: string,
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
    public static patchBookings({
        xStoreId,
        id,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Booking id
         */
        id: string,
        requestBody: UpdateBookingRequest,
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
    public static postBookingsCompletionToken({
        id,
    }: {
        /**
         * Booking id
         */
        id: string,
    }): CancelablePromise<BookingCompletionTokenResponse> {
        return __request(OpenAPI, {
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
    public static postBookingsCompleteByToken({
        xStoreId,
        id,
        requestBody,
    }: {
        xStoreId: string,
        id: string,
        requestBody: {
            token: string;
        },
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
    public static postBookingsCompleteByCode({
        xStoreId,
        id,
        requestBody,
    }: {
        xStoreId: string,
        id: string,
        requestBody: {
            code: string;
        },
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
    public static postBookingsReschedule({
        xStoreId,
        id,
        requestBody,
    }: {
        xStoreId: string,
        id: string,
        requestBody: RescheduleBookingRequest,
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
    public static postBookingsCancel({
        xStoreId,
        id,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        /**
         * Booking id
         */
        id: string,
    }): CancelablePromise<Booking> {
        return __request(OpenAPI, {
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
