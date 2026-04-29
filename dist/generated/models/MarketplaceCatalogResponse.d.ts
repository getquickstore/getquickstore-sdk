import type { MarketplaceProduct } from './MarketplaceProduct';
import type { MarketplaceService } from './MarketplaceService';
export type MarketplaceCatalogResponse = {
    ok?: boolean;
    products?: Array<MarketplaceProduct>;
    services?: Array<MarketplaceService>;
};
