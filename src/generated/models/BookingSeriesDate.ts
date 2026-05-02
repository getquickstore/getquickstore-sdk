/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BookingSeriesDate = {
    id: string;
    date?: string | null;
    time: string;
    startAt?: string | null;
    endAt?: string | null;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    bookingId?: string | null;
};

