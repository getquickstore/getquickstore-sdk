import type { Booking } from '../models/Booking';
import type { BookingListResponse } from '../models/BookingListResponse';
import type { CreateBookingRequest } from '../models/CreateBookingRequest';
import type { UpdateBookingRequest } from '../models/UpdateBookingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class BookingsService {
    /**
     * List bookings
     * Returns bookings for the current store context. Store context is resolved from the x-store-id header, or from the authenticated user's default store when available.
     * @returns BookingListResponse Booking list
     * @throws ApiError
     */
    static getBookings({ xStoreId, status, serviceId, dateFrom, dateTo, }: {
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string;
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
     * Creates a booking for a store service. Store context is resolved from the x-store-id header, or from the authenticated user's default store when available. End time is calculated automatically from service duration.
     * @returns Booking Booking created
     * @throws ApiError
     */
    static postBookings({ requestBody, xStoreId, }: {
        requestBody: CreateBookingRequest;
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string;
    }): CancelablePromise<Booking>;
    /**
     * Get booking by id
     * Returns a single booking from the current store context.
     * @returns Booking Booking details
     * @throws ApiError
     */
    static getBookings1({ id, xStoreId, }: {
        /**
         * Booking id
         */
        id: string;
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string;
    }): CancelablePromise<Booking>;
    /**
     * Update booking
     * Updates booking status, payment status, or customer fields.
     * @returns Booking Booking updated
     * @throws ApiError
     */
    static patchBookings({ id, requestBody, xStoreId, }: {
        /**
         * Booking id
         */
        id: string;
        requestBody: UpdateBookingRequest;
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string;
    }): CancelablePromise<Booking>;
    /**
     * Cancel booking
     * Marks booking as CANCELLED.
     * @returns Booking Booking cancelled
     * @throws ApiError
     */
    static postBookingsCancel({ id, xStoreId, }: {
        /**
         * Booking id
         */
        id: string;
        /**
         * Store context id. If omitted, the server may use the authenticated user's default store.
         */
        xStoreId?: string;
    }): CancelablePromise<Booking>;
}
