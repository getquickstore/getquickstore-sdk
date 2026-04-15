import type { AvailabilityUpsertRequest } from '../models/AvailabilityUpsertRequest';
import type { AvailabilityWindow } from '../models/AvailabilityWindow';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class AvailabilityService {
    /**
     * Create or update availability window
     * @returns AvailabilityWindow Availability created or updated
     * @throws ApiError
     */
    static postAvailability({ requestBody, }: {
        requestBody: AvailabilityUpsertRequest;
    }): CancelablePromise<AvailabilityWindow>;
}
