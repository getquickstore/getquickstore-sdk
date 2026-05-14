/**
 * At least trackingNumber or shipmentProofUrl is required.
 */
export type SubmitReturnShipmentRequest = {
    carrier?: string | null;
    trackingNumber?: string | null;
    shipmentProofUrl?: string | null;
};
