export type AvailabilityUpsertRequest = {
    /**
     * 0 = Sunday, 6 = Saturday
     */
    weekday: number;
    startTime: string;
    endTime: string;
    slotStepMin?: number;
    isEnabled?: boolean;
};
