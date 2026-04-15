/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailabilityUpsertRequest } from '../models/AvailabilityUpsertRequest';
import type { AvailabilityWindow } from '../models/AvailabilityWindow';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AvailabilityService {
    /**
     * Create or update availability window
     * @returns AvailabilityWindow Availability created or updated
     * @throws ApiError
     */
    public static postAvailability({
        requestBody,
    }: {
        requestBody: AvailabilityUpsertRequest,
    }): CancelablePromise<AvailabilityWindow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/availability',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
