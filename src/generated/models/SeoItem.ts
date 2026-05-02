/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeoProduct } from './SeoProduct';
import type { SeoServiceItem } from './SeoServiceItem';
import type { SeoStore } from './SeoStore';
export type SeoItem = {
    type?: 'STORE' | 'PRODUCT' | 'SERVICE';
    store?: SeoStore | null;
    product?: SeoProduct | null;
    service?: SeoServiceItem | null;
};

