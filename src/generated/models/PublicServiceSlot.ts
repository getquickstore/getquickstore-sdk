/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PublicServiceSlot = {
    start: string;
    end: string;
    startAt: string;
    endAt: string;
    available: boolean;
    /**
     * Existing booking id when this slot is busy.
     */
    bookingId?: string | null;
    /**
     * Service id of the booking that blocks this slot.
     */
    conflictServiceId?: string | null;
};

