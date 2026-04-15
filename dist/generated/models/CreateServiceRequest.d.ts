export type CreateServiceRequest = {
    storeId: string;
    name: string;
    slug?: string;
    durationMin: number;
    priceCents: number;
    isActive?: boolean;
};
