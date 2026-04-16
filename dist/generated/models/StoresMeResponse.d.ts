import type { StoreOwnerView } from './StoreOwnerView';
export type StoresMeResponse = {
    user: {
        id: string;
        email: string;
        roles: Array<string>;
        defaultStoreId: string | null;
    };
    stores: Array<StoreOwnerView>;
};
