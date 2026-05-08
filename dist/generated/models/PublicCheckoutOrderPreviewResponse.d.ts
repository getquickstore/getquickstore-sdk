import type { PublicCheckoutAddress } from './PublicCheckoutAddress';
export type PublicCheckoutOrderPreviewResponse = {
    ok: boolean;
    order: {
        id: string;
        number: string;
        status: string;
        paymentStatus: string;
        fulfillmentType: 'STANDARD' | 'PICKUP';
        createdAt?: string | null;
        currency: string;
        subtotalCents?: number;
        discountCents?: number;
        shippingCents?: number;
        taxCents?: number;
        totalCents?: number;
    };
    store: {
        id?: string;
        name?: string;
        slug?: string | null;
        publicUrl?: string | null;
        logoUrl?: string | null;
        supportEmail?: string | null;
        supportPhone?: string | null;
        website?: string | null;
        description?: string | null;
        address?: PublicCheckoutAddress;
        tax?: {
            vatNumber?: string | null;
        };
    };
    buyer: {
        name?: string | null;
        email?: string | null;
        phone?: string | null;
        shippingAddress?: PublicCheckoutAddress | null;
        billingAddress?: PublicCheckoutAddress | null;
    };
    items: Array<{
        id: string;
        productId: string;
        variantId?: string | null;
        title?: string;
        sku?: string | null;
        qty: number;
        unitPriceCents: number;
        totalCents: number;
        imageUrl?: string | null;
        taxCode?: string | null;
        taxBehavior?: 'inclusive' | 'exclusive';
    }>;
    tax: {
        enabled?: boolean;
        liability?: 'SELLER' | 'PLATFORM';
        behavior?: 'inclusive' | 'exclusive';
        businessCountry?: string | null;
        businessCity?: string | null;
        businessAddress?: string | null;
        postalCode?: string | null;
        vatNumber?: string | null;
        defaultProductTaxCode?: string | null;
        defaultServiceTaxCode?: string | null;
    };
    fulfillment: {
        type?: 'STANDARD' | 'PICKUP';
        isPickup?: boolean;
        isDelivery?: boolean;
    };
    delivery: {
        includedInPayment?: boolean;
        message?: string;
    };
};
