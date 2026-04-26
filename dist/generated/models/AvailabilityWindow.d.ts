export type AvailabilityWindow = {
    id: string;
    storeId: string;
    /**
     * 0 = Sunday, 6 = Saturday
     */
    weekday: number;
    startTime: string;
    endTime: string;
    slotStepMin: number;
    isEnabled: boolean;
    createdAt?: string;
    updatedAt?: string;
};
