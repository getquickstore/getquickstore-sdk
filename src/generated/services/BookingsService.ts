/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { BookingCompletionTokenResponse } from '../models/BookingCompletionTokenResponse';
import type { BookingListResponse } from '../models/BookingListResponse';
import type { CreateBookingRequest } from '../models/CreateBookingRequest';
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
     * Creates a booking for a store service. Requires authenticated customer and x-store-id. Customer does not need seller access to the store. End time is calculated automatically from service duration.
     * @returns Booking Booking created
     * @throws ApiError
     */
    public static postBookings({
        xStoreId,
        requestBody,
    }: {
        /**
         * Store context id.
         */
        xStoreId: string,
        requestBody: CreateBookingRequest,
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
     * Returns bookings created by the authenticated customer across all stores. Does not require x-store-id.
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
