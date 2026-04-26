/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarBookingService } from './CalendarBookingService';
export type CalendarItem = {
    id?: string;
    storeId?: string;
    serviceId?: string;
    userId?: string | null;
    startAt?: string;
    endAt?: string;
    status?: string;
    paymentStatus?: string;
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
    createdAt?: string;
    updatedAt?: string;
    service?: CalendarBookingService | null;
};

