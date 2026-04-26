/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PublicService } from './PublicService';
import type { PublicServiceSlot } from './PublicServiceSlot';
export type PublicServiceSlotsResponse = {
    ok: boolean;
    date: string;
    serviceId: string;
    storeId: string;
    service: PublicService;
    isOpen: boolean;
    slots: Array<PublicServiceSlot>;
};

