export type BillingPlan = {
    code: string;
    name: string;
    currency: string;
    priceCents: number;
    interval: string;
    graceDays: number;
    isActive: boolean;
    isUnlimited: boolean;
    stripePriceId?: string | null;
    stripeProductId?: string | null;
};
