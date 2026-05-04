/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateServiceReviewRequest = {
    rating: number;
    comment?: string | null;
    /**
     * Alias for comment
     */
    body?: string | null;
    /**
     * Booking ID for verified completed service review
     */
    bookingId?: string | null;
};

