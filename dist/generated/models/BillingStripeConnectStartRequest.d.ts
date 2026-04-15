export type BillingStripeConnectStartRequest = {
    /**
     * Frontend return URL after Stripe Connect onboarding
     */
    returnUrl: string;
    /**
     * Frontend refresh URL if Stripe Connect onboarding needs retry
     */
    refreshUrl: string;
};
