import type { AvailabilitySlot } from './AvailabilitySlot';
export type ServiceAvailabilityResponse = {
    date?: string;
    slots?: Array<AvailabilitySlot>;
};
