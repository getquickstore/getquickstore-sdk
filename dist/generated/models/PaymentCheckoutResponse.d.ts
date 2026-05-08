import type { CheckoutTaxContext } from './CheckoutTaxContext';
export type PaymentCheckoutResponse = {
    ok: boolean;
    url: string;
    sessionId: string;
    tax?: CheckoutTaxContext;
};
