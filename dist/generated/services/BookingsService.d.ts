import type { Booking } from '../models/Booking';
import type { BookingCompletionTokenResponse } from '../models/BookingCompletionTokenResponse';
import type { BookingListResponse } from '../models/BookingListResponse';
import type { CreateBookingRequest } from '../models/CreateBookingRequest';
import type { UpdateBookingRequest } from '../models/UpdateBookingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class BookingsService {
    /**
     * List bookings
     * Returns bookings for the current store context. Requires x-store-id. Intended for seller/admin calendar and booking management.
     * @returns BookingListResponse Booking list
     * @throws ApiError
     */
    static getBookings({ xStoreId, status, serviceId, dateFrom, dateTo, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Filter by booking status
         */
        status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
        /**
         * Filter by service id in the current store
         */
        serviceId?: string;
        /**
         * Filter bookings with startAt >= dateFrom
         */
        dateFrom?: string;
        /**
         * Filter bookings with startAt <= dateTo
         */
        dateTo?: string;
    }): CancelablePromise<BookingListResponse>;
    /**
     * Create booking
     * Creates a booking for a store service. Requires authenticated customer and x-store-id. Customer does not need seller access to the store. End time is calculated automatically from service duration.
     * @returns Booking Booking created
     * @throws ApiError
     */
    static postBookings({ xStoreId, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        requestBody: CreateBookingRequest;
    }): CancelablePromise<Booking>;
    /**
     * List my bookings
     * Returns bookings created by the authenticated customer across all stores. Does not require x-store-id.
     * @returns BookingListResponse Customer booking list
     * @throws ApiError
     */
    static getBookingsMe(): CancelablePromise<BookingListResponse>;
    /**
     * Get booking by id
     * Returns a single booking from the current store context.
     * @returns Booking Booking details
     * @throws ApiError
     */
    static getBookings1({ xStoreId, id, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Booking id
         */
        id: string;
    }): CancelablePromise<Booking>;
    /**
     * Update booking
     * Updates booking status, payment status, or customer fields. Intended for seller/admin booking management.
     * @returns Booking Booking updated
     * @throws ApiError
     */
    static patchBookings({ xStoreId, id, requestBody, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Booking id
         */
        id: string;
        requestBody: UpdateBookingRequest;
    }): CancelablePromise<Booking>;
    /**
     * Generate booking completion token
     * Generates a short-lived token and code for booking completion. Intended for customer device (QR / code display).
     * @returns BookingCompletionTokenResponse Completion token generated
     * @throws ApiError
     */
    static postBookingsCompletionToken({ id, }: {
        /**
         * Booking id
         */
        id: string;
    }): CancelablePromise<BookingCompletionTokenResponse>;
    /**
     * Complete booking by token (QR)
     * Completes booking using QR token. Intended for seller/admin scan flow.
     * @returns Booking Booking completed
     * @throws ApiError
     */
    static postBookingsCompleteByToken({ xStoreId, id, requestBody, }: {
        xStoreId: string;
        id: string;
        requestBody: {
            token: string;
        };
    }): CancelablePromise<Booking>;
    /**
     * Complete booking by code
     * Completes booking using manual code input (fallback when QR is unavailable).
     * @returns Booking Booking completed
     * @throws ApiError
     */
    static postBookingsCompleteByCode({ xStoreId, id, requestBody, }: {
        xStoreId: string;
        id: string;
        requestBody: {
            code: string;
        };
    }): CancelablePromise<Booking>;
    /**
     * Cancel booking
     * Marks booking as CANCELLED.
     * @returns Booking Booking cancelled
     * @throws ApiError
     */
    static postBookingsCancel({ xStoreId, id, }: {
        /**
         * Store context id.
         */
        xStoreId: string;
        /**
         * Booking id
         */
        id: string;
    }): CancelablePromise<Booking>;
}
