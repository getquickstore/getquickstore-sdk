export type CartProductMini = {
    id: string;
    name: string;
    slug: string;
    sku: string | null;
    status: string;
    priceCents: number;
    currency: string;
    taxCode: string | null;
    taxBehavior: 'inclusive' | 'exclusive' | null;
};
