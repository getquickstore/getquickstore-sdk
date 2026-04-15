/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoreStripeState } from './StoreStripeState';
export type StripeConnectStartResponse = {
    ok: boolean;
    storeId: string;
    onboardingUrl: string;
    expiresAt?: number | null;
    stripe: StoreStripeState;
};

