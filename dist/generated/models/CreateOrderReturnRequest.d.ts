import type { ReturnReason } from './ReturnReason';
export type CreateOrderReturnRequest = {
    reason: ReturnReason;
    comment?: string | null;
    photos?: Array<string>;
};
