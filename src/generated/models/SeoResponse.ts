/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoItem } from './SeoItem';
import type { SeoMeta } from './SeoMeta';
import type { SeoPageInfo } from './SeoPageInfo';
import type { SeoProduct } from './SeoProduct';
import type { SeoServiceItem } from './SeoServiceItem';
import type { SeoStore } from './SeoStore';
export type SeoResponse = {
    seo: SeoMeta;
    page: SeoPageInfo;
    store?: SeoStore | null;
    product?: SeoProduct | null;
    service?: SeoServiceItem | null;
    items?: Array<SeoItem>;
};

