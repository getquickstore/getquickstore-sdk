import type { StoreCoverView } from './StoreCoverView';
export type StoreCoverResponse = {
    ok: boolean;
    coverKey: string | null;
    coverUrl: string | null;
    store: StoreCoverView;
};
