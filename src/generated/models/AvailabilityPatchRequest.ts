/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailabilityBreak } from './AvailabilityBreak';
import type { AvailabilityWorkBlock } from './AvailabilityWorkBlock';
export type AvailabilityPatchRequest = {
    weekday?: number;
    startTime?: string;
    workBlocks?: Array<AvailabilityWorkBlock>;
    breaks?: Array<AvailabilityBreak>;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    minNoticeMin?: number;
    endTime?: string;
    slotStepMin?: number;
    isEnabled?: boolean;
};

