/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServiceRequest } from '../models/CreateServiceRequest';
import type { Service } from '../models/Service';
import type { ServiceAvailabilityResponse } from '../models/ServiceAvailabilityResponse';
import type { ServiceListResponse } from '../models/ServiceListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServicesService {
    /**
     * List services
     * @returns ServiceListResponse Service list
     * @throws ApiError
     */
    public static getServices(): CancelablePromise<ServiceListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services',
        });
    }
    /**
     * Create service
     * @returns Service Service created
     * @throws ApiError
     */
    public static postServices({
        requestBody,
    }: {
        requestBody: CreateServiceRequest,
    }): CancelablePromise<Service> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/services',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get service availability for date
     * @returns ServiceAvailabilityResponse Available slots for date
     * @throws ApiError
     */
    public static getServicesAvailability({
        id,
        date,
    }: {
        id: string,
        date: string,
    }): CancelablePromise<ServiceAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services/{id}/availability',
            path: {
                'id': id,
            },
            query: {
                'date': date,
            },
        });
    }
}
