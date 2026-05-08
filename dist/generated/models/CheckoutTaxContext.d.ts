export type CheckoutTaxContext = {
    enabled?: boolean;
    liability?: 'SELLER' | 'PLATFORM';
    behavior?: 'inclusive' | 'exclusive';
    provider?: string | null;
    automaticTax?: boolean | null;
};
