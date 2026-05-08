export type CheckoutTaxContext = {
    enabled?: boolean;
    liability?: 'SELLER' | 'PLATFORM';
    behavior?: 'inclusive' | 'exclusive';
};
