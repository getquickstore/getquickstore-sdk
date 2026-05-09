/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BookingPaymentCheckoutPreviewResponse = {
    ok: boolean;
    bookingId: string;
    subtotalCents: number;
    taxCents: number;
    totalCents: number;
    currency: string;
    taxStatus: 'CALCULATED' | 'STRIPE_REQUIRED' | 'DISABLED' | 'ADDRESS_REQUIRED';
    taxEnabled: boolean;
    taxBehavior: 'inclusive' | 'exclusive';
    taxLiability: 'SELLER' | 'PLATFORM';
    stripeTaxCalculationId?: string | null;
};

