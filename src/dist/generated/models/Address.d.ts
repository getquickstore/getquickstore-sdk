export type Address = {
    id: string;
    userId?: string | null;
    customerId?: string | null;
    line1: string;
    line2?: string | null;
    city: string;
    region?: string | null;
    country: string;
    postalCode?: string | null;
    type: string;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
    createdAt: string;
    updatedAt: string;
};
