import type { PaymentStatus } from './PaymentStatus';
export type PaymentConflictError = {
    ok: boolean;
    error: string;
    paymentStatus?: PaymentStatus | null;
};
