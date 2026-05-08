export type ProfileAddressInput = {
    line1: string;
    line2?: string | null;
    city: string;
    region?: string | null;
    country: string;
    postalCode?: string;
    type?: string;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
};
