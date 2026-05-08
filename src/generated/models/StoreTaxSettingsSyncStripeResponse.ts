/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoreSettingsView } from './StoreSettingsView';
export type StoreTaxSettingsSyncStripeResponse = {
    ok: boolean;
    settings: StoreSettingsView;
    stripe: {
        accountId: string;
        chargesEnabled: boolean;
        payoutsEnabled: boolean;
    };
};

