export type CreateServiceRequest = {
    name: string;
    description?: string | null;
    durationMin: number;
    price: number;
    currency?: string | null;
    isActive?: boolean;
};
