/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailabilitySlot } from './AvailabilitySlot';
import type { Service } from './Service';
export type ServiceAvailabilityResponse = {
    date: string;
    weekday: number;
    timezone: string;
    fromLocal: string;
    toLocal: string;
    from: string;
    to: string;
    service: Service;
    slots: Array<AvailabilitySlot>;
};

