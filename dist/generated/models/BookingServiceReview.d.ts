export type BookingServiceReview = {
    id: string;
    serviceId: string;
    bookingId?: string | null;
    userId?: string | null;
    rating: number;
    comment?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};
