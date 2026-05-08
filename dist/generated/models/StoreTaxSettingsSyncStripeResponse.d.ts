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
