import type { StoreSeoSettings } from './StoreSeoSettings';
export type StoreSeoSettingsResponse = {
    ok: boolean;
    seo: StoreSeoSettings | null;
};
