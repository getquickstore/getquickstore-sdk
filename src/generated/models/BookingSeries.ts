/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { BookingService } from './BookingService';
export type BookingSeries = {
    id: string;
    storeId: string;
    serviceId: string;
    userId?: string | null;
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    paymentStatus: 'REQUIRES_ACTION' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
    startDate?: string | null;
    endDate?: string | null;
    weekdays: Array<number>;
    time: string;
    totalCents: number;
    total: number;
    currency: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    cancelledAt?: string | null;
    completedAt?: string | null;
    service?: BookingService | null;
    bookings?: Array<Booking>;
};

