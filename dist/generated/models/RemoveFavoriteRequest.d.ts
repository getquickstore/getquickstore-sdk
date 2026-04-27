export type RemoveFavoriteRequest = {
    type: 'PRODUCT' | 'SERVICE' | 'STORE';
    productId?: string | null;
    serviceId?: string | null;
    storeId?: string | null;
};
