/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ServiceReview = {
    id: string;
    serviceId: string;
    bookingId: string | null;
    userId?: string | null;
    rating: number;
    comment?: string | null;
    isFlagged: boolean;
    createdAt: string;
    updatedAt: string;
};

