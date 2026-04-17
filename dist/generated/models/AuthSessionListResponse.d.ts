import type { AuthSession } from './AuthSession';
export type AuthSessionListResponse = {
    ok?: boolean;
    items: Array<AuthSession>;
};
