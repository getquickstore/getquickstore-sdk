/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoreStripeSummary = {
    connected: boolean;
    status: 'not_connected' | 'action_required' | 'connected';
    accountId: string | null;
    onboardingComplete: boolean;
    detailsSubmitted: boolean;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    stripeStatus: string;
};

