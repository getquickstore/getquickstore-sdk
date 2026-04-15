export type CreateBookingRequest = {
    /**
     * Service id in the current store
     */
    serviceId: string;
    /**
     * Booking start datetime. Date-only values are not allowed.
     */
    startAt: string;
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
};
