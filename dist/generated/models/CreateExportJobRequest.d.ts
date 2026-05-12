export type CreateExportJobRequest = {
    type?: 'ORDERS' | 'BOOKINGS' | 'BOOKING_SERIES' | 'PAYMENTS' | 'REFUNDS' | 'TAX_SUMMARY' | 'FINANCIAL_SUMMARY' | 'FULL_FINANCIAL_REPORT';
    format?: 'CSV' | 'XLSX' | 'JSON' | 'GOOGLE_SHEETS';
    dateFrom?: string | null;
    dateTo?: string | null;
    filters?: Record<string, any> | null;
};
