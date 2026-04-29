import type { MarketplaceProduct } from './MarketplaceProduct';
export type PublicProductListResponse = {
    ok?: boolean;
    items?: Array<MarketplaceProduct>;
};
