/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutTaxContext } from './CheckoutTaxContext';
export type PaymentCheckoutResponse = {
    ok: boolean;
    url: string;
    sessionId: string;
    tax?: CheckoutTaxContext;
};

