export type StoreStripeState = {
    stripeAccountId: string | null;
    stripeStatus: string;
    stripeOnboardingComplete: boolean;
    stripeDetailsSubmitted: boolean;
    stripeChargesEnabled: boolean;
    stripePayoutsEnabled: boolean;
    stripeRequirementsJson: Record<string, any> | null;
};
