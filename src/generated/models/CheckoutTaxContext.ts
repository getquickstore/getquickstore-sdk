/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CheckoutTaxContext = {
    enabled?: boolean;
    liability?: 'SELLER' | 'PLATFORM';
    behavior?: 'inclusive' | 'exclusive';
    provider?: string | null;
    automaticTax?: boolean | null;
};

