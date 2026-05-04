export type ProductReview = {
    id: string;
    productId: string;
    orderItemId?: string | null;
    userId?: string | null;
    rating: number;
    comment?: string | null;
    isFlagged: boolean;
    createdAt: string;
    updatedAt: string;
};
