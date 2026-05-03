export type PublicServiceSlot = {
    start: string;
    blockedType: 'BOOKING' | 'BREAK' | null;
    end: string;
    startAt: string;
    endAt: string;
    available: boolean;
    /**
     * Existing booking id when this slot is busy.
     */
    bookingId: string | null;
    /**
     * Service id of the booking that blocks this slot.
     */
    conflictServiceId: string | null;
};
