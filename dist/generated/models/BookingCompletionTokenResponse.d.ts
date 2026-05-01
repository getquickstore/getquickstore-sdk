export type BookingCompletionTokenResponse = {
    item: {
        bookingId: string;
        storeId: string;
        token: string;
        code: string;
        expiresAt: string;
        qrPayload: {
            type: string;
            bookingId: string;
            token: string;
        };
    };
};
