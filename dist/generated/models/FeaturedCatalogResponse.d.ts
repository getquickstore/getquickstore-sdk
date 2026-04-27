import type { FeaturedService } from './FeaturedService';
import type { ProductDetail } from './ProductDetail';
export type FeaturedCatalogResponse = {
    ok: boolean;
    products: Array<ProductDetail>;
    services: Array<FeaturedService>;
    limit: number;
};
