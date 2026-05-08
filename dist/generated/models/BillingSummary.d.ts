export type BillingSummary = {
    isActive: boolean;
    accessStatus: 'active' | 'grace' | 'inactive';
    status: string;
    planCode: string;
    planName: string;
    priceCents: number;
    currency: string;
    interval: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
};
