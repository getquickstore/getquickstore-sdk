export type OrderPickupToken = {
    id: string;
    codeTail: string;
    expiresAt: string;
    usedAt?: string | null;
    createdAt: string;
};
