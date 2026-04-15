export type BillingSubscription = {
    status: string;
    provider: string;
    planCode: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    graceDays: number;
    isActive: boolean;
    isInGracePeriod: boolean;
    accessStatus: 'active' | 'grace' | 'inactive';
    graceEndsAt: string | null;
};
