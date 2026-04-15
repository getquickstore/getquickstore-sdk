export type AuthSession = {
    id: string;
    token: string;
    createdAt: string;
    revokedAt?: string | null;
};
