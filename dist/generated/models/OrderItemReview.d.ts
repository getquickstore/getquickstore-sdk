export type OrderItemReview = {
    id: string;
    productId: string;
    orderItemId: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    updatedAt?: string;
};
