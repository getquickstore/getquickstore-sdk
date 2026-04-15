export type AuthUser = {
    id?: string;
    email?: string;
    roles?: Array<string>;
    defaultStoreId?: string | null;
};
