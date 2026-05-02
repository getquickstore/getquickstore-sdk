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
     * Preview custom booking series
     * Calculates custom date/time booking slots, conflicts and total price without creating bookings.
     * @returns CustomBookingSeriesPreviewResponse Custom series preview
     * @throws ApiError
     */
    static postBookingsSeriesCustomPreview({ requestBody, xStoreId, }: {
        requestBody: CustomBookingSeriesPreviewRequest;
        xStoreId?: string;
    }): CancelablePromise<CustomBookingSeriesPreviewResponse>;
    /**
     * Create custom booking series
     * Creates a booking series from explicitly selected dates and times.
     * @returns BookingSeries Custom series created
     * @throws ApiError
     */
    static postBookingsSeriesCustom({ requestBody, xStoreId, }: {
        requestBody: CreateCustomBookingSeriesRequest;
        xStoreId?: string;
    }): CancelablePromise<BookingSeries>;
    /**
     * Preview booking series
     * Calculates recurring booking slots, conflicts and total price without creating bookings.
     * @returns BookingSeriesPreviewResponse Series preview
     * @throws ApiError
     */
    static postBookingsSeriesPreview({ requestBody, xStoreId, }: {
        requestBody: BookingSeriesPreviewRequest;
        xStoreId?: string;
    }): CancelablePromise<BookingSeriesPreviewResponse>;
    /**
     * Create booking series
     * Creates a booking series and all concrete booking slots.
     * @returns BookingSeries Series created
     * @throws ApiError
     */
    static postBookingsSeries({ requestBody, xStoreId, }: {
        requestBody: CreateBookingSeriesRequest;
        xStoreId?: string;
    }): CancelablePromise<BookingSeries>;
    /**
     * List booking series for store
     * Returns booking series for the current store context.
     * @returns BookingSeriesListResponse Series list
     * @throws ApiError
     */
    static getBookingsSeries({ xStoreId, }: {
        xStoreId: string;
    }): CancelablePromise<BookingSeriesListResponse>;
    /**
     * List my booking series
     * Returns recurring booking series created by the authenticated customer.
     * @returns BookingSeriesListResponse Customer series list
     * @throws ApiError
     */
    static getBookingsSeriesMe(): CancelablePromise<BookingSeriesListResponse>;
    /**
     * Get booking series
     * Returns one booking series with its concrete bookings.
     * @returns BookingSeries Series details
     * @throws ApiError
     */
    static getBookingsSeries1({ id, xStoreId, }: {
        id: string;
        xStoreId?: string;
    }): CancelablePromise<BookingSeries>;
    /**
     * Cancel booking series
     * Cancels the series and future active bookings in it.
     * @returns BookingSeries Series cancelled
     * @throws ApiError
     */
    static postBookingsSeriesCancel({ xStoreId, id, }: {
        xStoreId: string;
        id: string;
    }): CancelablePromise<BookingSeries>;
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
     * Reschedule booking
     * Moves a single active booking to another available time slot.
     * @returns Booking Booking rescheduled
     * @throws ApiError
     */
    static postBookingsReschedule({ xStoreId, id, requestBody, }: {
        xStoreId: string;
        id: string;
        requestBody: RescheduleBookingRequest;
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
