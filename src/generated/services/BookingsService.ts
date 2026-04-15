/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { BookingListResponse } from '../models/BookingListResponse';
import type { CreateBookingRequest } from '../models/CreateBookingRequest';
import type { UpdateBookingRequest } from '../models/UpdateBookingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingsService {
    /**
     * List bookings
     * Returns bookings for the current store context. Store context is resolved from the x-store-id header, or from the authenticated user's default store when available.
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
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string,
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
     * Creates a booking for a store service. Store context is resolved from the x-store-id header, or from the authenticated user's default store when available. End time is calculated automatically from service duration.
     * @returns Booking Booking created
     * @throws ApiError
     */
    public static postBookings({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateBookingRequest,
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
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
                403: `Access denied for current store`,
                404: `Service or store not found`,
                409: `Booking conflict`,
                500: `Failed to create booking`,
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
        id,
        xStoreId,
    }: {
        /**
         * Booking id
         */
        id: string,
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string,
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
     * Updates booking status, payment status, or customer fields.
     * @returns Booking Booking updated
     * @throws ApiError
     */
    public static patchBookings({
        id,
        requestBody,
        xStoreId,
    }: {
        /**
         * Booking id
         */
        id: string,
        requestBody: UpdateBookingRequest,
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string,
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
     * Cancel booking
     * Marks booking as CANCELLED.
     * @returns Booking Booking cancelled
     * @throws ApiError
     */
    public static postBookingsCancel({
        id,
        xStoreId,
    }: {
        /**
         * Booking id
         */
        id: string,
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string,
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
