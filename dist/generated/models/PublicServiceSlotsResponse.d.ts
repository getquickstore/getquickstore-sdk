import type { AvailabilityPublicService } from './AvailabilityPublicService';
import type { PublicServiceSlot } from './PublicServiceSlot';
export type PublicServiceSlotsResponse = {
    ok: boolean;
    date: string;
    serviceId: string;
    storeId: string;
    service: AvailabilityPublicService;
    isOpen: boolean;
    slots: Array<PublicServiceSlot>;
};
