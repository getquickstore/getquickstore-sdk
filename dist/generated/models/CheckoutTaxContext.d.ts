export type CheckoutTaxContext = {
    enabled?: boolean;
    liability?: 'SELLER' | 'PLATFORM';
    behavior?: 'inclusive' | 'exclusive';
    provider?: string | null;
    automaticTax?: boolean | null;
    taxStatus?: 'CALCULATED' | 'STRIPE_REQUIRED' | 'DISABLED' | 'ADDRESS_REQUIRED' | null;
    taxCents?: number | null;
    totalCents?: number | null;
    stripeTaxCalculationId?: string | null;
};
