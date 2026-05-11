import type { SeoPageInfo } from './SeoPageInfo';
import type { StoreSeoRebuildBuild } from './StoreSeoRebuildBuild';
export type StoreSeoRebuildResponse = {
    ok: boolean;
    page: SeoPageInfo | null;
    build: StoreSeoRebuildBuild | null;
    url: string | null;
};
