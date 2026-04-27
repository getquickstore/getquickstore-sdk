export type AvailabilityPatchRequest = {
    weekday?: number;
    startTime?: string;
    endTime?: string;
    slotStepMin?: number;
    isEnabled?: boolean;
};
