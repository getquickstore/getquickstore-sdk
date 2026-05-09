export type BookingSeriesPaymentCheckoutPreviewResponse = {
    ok: boolean;
    seriesId: string;
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
