import type { CartItem } from './CartItem';
export type Cart = {
    id: string;
    storeId: string;
    customerId: string | null;
    userId: string | null;
    anonymousId: string | null;
    isActive: boolean;
    currency: string;
    totalCents: number;
    items: Array<CartItem>;
    createdAt: string;
    updatedAt: string;
};
