export type BillingPortalRequest = {
    storeId?: string;
    /**
     * Optional return URL for Stripe portal
     */
    returnUrl?: string | null;
};
