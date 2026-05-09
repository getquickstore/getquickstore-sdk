export type CreatePickupTokenResponse = {
    ok: boolean;
    pickup: {
        code: string;
        qrToken: string;
        expiresAt: string;
    };
};
