/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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

