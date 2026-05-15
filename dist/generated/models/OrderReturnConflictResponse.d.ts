import type { OrderReturn } from './OrderReturn';
export type OrderReturnConflictResponse = {
    ok: boolean;
    error: string;
    returnId?: string | null;
    item?: OrderReturn | null;
};
