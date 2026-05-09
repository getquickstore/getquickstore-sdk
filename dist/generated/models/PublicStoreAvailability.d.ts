export type PublicStoreAvailability = {
    id: string;
    storeId: string;
    weekday: number;
    startTime: string;
    endTime: string;
    slotStepMin: number;
    isEnabled: boolean;
    workBlocks?: any;
    breaks?: any;
    bufferBeforeMin: number;
    bufferAfterMin: number;
    minNoticeMin: number;
};
