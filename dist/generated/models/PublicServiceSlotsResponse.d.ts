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
