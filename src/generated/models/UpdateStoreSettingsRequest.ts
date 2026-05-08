/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateStoreSettingsRequest = {
    taxEnabled?: boolean;
    taxLiability?: 'SELLER' | 'PLATFORM';
    taxBehavior?: 'inclusive' | 'exclusive';
    businessCountry?: string | null;
    businessCity?: string | null;
    businessAddress?: string | null;
    postalCode?: string | null;
    vatNumber?: string | null;
    defaultProductTaxCode?: string | null;
    defaultServiceTaxCode?: string | null;
};

