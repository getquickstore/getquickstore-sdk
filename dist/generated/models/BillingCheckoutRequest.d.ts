export type BillingCheckoutRequest = {
    storeId?: string;
    /**
     * Optional success redirect URL
     */
    successUrl?: string | null;
    /**
     * Optional cancel redirect URL
     */
    cancelUrl?: string | null;
};
