import type { AuthStoreBrief } from './AuthStoreBrief';
export type AuthMeResponse = {
    id: string;
    email: string;
    roles: Array<string>;
    defaultStoreId?: string | null;
    stores: Array<AuthStoreBrief>;
};
