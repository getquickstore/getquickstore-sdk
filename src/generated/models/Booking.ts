/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingService } from './BookingService';
export type Booking = {
    id: string;
    storeId: string;
    serviceId: string;
    userId: string | null;
    customerName: string | null;
    customerEmail: string | null;
    customerPhone: string | null;
    notes: string | null;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    paymentStatus: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
    startAt: string;
    endAt: string;
    startAtMs: number;
    endAtMs: number;
    createdAt: string | null;
    updatedAt: string | null;
    service: (BookingService | null);
};

