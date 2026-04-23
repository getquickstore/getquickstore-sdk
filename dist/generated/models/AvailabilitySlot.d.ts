export type AvailabilitySlot = {
    start: string;
    end: string;
    startAt: string;
    endAt: string;
    available: boolean;
    bookingId?: string | null;
};
