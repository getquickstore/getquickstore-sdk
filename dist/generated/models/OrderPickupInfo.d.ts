import type { OrderPickupToken } from './OrderPickupToken';
export type OrderPickupInfo = {
    at?: string | null;
    readyAt?: string | null;
    token?: OrderPickupToken | null;
};
