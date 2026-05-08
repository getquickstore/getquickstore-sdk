import type { CheckoutTaxContext } from './CheckoutTaxContext';
export type BookingSeriesPaymentCheckoutResponse = {
    ok: boolean;
    url: string;
    sessionId: string;
    seriesId: string;
    tax?: CheckoutTaxContext;
};
