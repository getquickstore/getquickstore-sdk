export type BookingService = {
    id: string;
    storeId: string;
    name: string;
    slug: string;
    description?: string | null;
    durationMin: number;
    price: number;
    priceCents: number;
    currency: string;
    isActive: boolean;
};
