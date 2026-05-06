export type StripeConnectReuseResponse = {
    ok: boolean;
    storeId: string;
    stripe: {
        stripeAccountId?: string | null;
        stripeStatus?: string;
        stripeOnboardingComplete?: boolean;
        stripeDetailsSubmitted?: boolean;
        stripeChargesEnabled?: boolean;
        stripePayoutsEnabled?: boolean;
        stripeRequirementsJson?: Record<string, any> | null;
    };
};
