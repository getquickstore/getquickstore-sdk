export type StoreSummary = {
    id?: string;
    name?: string;
    slug?: string;
    status?: string;
    publicUrl?: string | null;
    stripeConnected?: boolean | null;
    chargesEnabled?: boolean | null;
    payoutsEnabled?: boolean | null;
    subscriptionStatus?: string | null;
    createdAt?: string;
    updatedAt?: string | null;
};
