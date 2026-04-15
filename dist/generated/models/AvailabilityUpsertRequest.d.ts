export type AvailabilityUpsertRequest = {
    storeId: string;
    weekday: number;
    startTime?: string;
    endTime?: string;
    slotStepMin?: number;
    isEnabled?: boolean;
};
