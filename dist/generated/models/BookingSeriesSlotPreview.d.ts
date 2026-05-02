export type BookingSeriesSlotPreview = {
    date: string;
    startAt: string;
    endAt: string;
    available: boolean;
    conflictBookingId?: string | null;
    error?: string | null;
    time?: string | null;
};
