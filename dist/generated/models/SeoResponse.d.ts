import type { SeoItem } from './SeoItem';
import type { SeoJsonLd } from './SeoJsonLd';
import type { SeoMeta } from './SeoMeta';
import type { SeoPageInfo } from './SeoPageInfo';
import type { SeoProduct } from './SeoProduct';
import type { SeoServiceItem } from './SeoServiceItem';
import type { SeoStore } from './SeoStore';
export type SeoResponse = {
    ok: boolean;
    seo: SeoMeta;
    page: SeoPageInfo;
    store?: SeoStore | null;
    product?: SeoProduct | null;
    service?: SeoServiceItem | null;
    availabilityIntent?: string | null;
    items?: Array<SeoItem>;
    jsonLd?: Array<SeoJsonLd>;
};
