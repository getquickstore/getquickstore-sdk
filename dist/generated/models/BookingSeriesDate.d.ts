export type BookingSeriesDate = {
    id: string;
    date?: string | null;
    time: string;
    startAt?: string | null;
    endAt?: string | null;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    bookingId?: string | null;
};
