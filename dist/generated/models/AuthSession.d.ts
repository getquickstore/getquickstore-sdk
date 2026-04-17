export type AuthSession = {
    id: string;
    status?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    isTrusted?: boolean | null;
    createdAt: string;
    lastSeenAt?: string | null;
    expiresAt?: string | null;
    revokedAt?: string | null;
    revokeReason?: string | null;
};
