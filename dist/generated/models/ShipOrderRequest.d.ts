/**
 * At least trackingNumber or shipmentReceiptUrl is required.
 */
export type ShipOrderRequest = {
    trackingCarrier?: string | null;
    trackingNumber?: string | null;
    shipmentReceiptUrl?: string | null;
};
