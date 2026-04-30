import type { ServiceTag } from './ServiceTag';
export type Service = {
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
    tags: Array<ServiceTag>;
    tagIds: Array<string>;
    createdAt?: string | null;
    updatedAt?: string | null;
};
