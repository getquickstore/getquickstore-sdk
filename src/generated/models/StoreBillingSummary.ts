/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoreBillingSummary = {
    subscriptionStatus: 'inactive' | 'active' | 'past_due' | 'canceled';
    accessStatus: 'active' | 'grace' | 'inactive';
    isActive: boolean;
    isInGracePeriod: boolean;
    cancelAtPeriodEnd: boolean;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    graceEndsAt: string | null;
};

