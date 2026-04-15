export type BillingStripeConnectStartResponse = {
    ok: boolean;
    storeId: string;
    /**
     * Stripe Connect onboarding URL
     */
    url: string;
    /**
     * Alias for the Stripe Connect onboarding URL
     */
    onboardingUrl?: string;
    expiresAt?: number | null;
    stripe?: Record<string, any> | null;
};
