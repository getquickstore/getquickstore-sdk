/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutTaxContext } from './CheckoutTaxContext';
export type BookingSeriesPaymentCheckoutResponse = {
    ok: boolean;
    url: string;
    sessionId: string;
    seriesId: string;
    tax?: CheckoutTaxContext;
};

