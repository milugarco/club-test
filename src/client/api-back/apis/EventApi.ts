/* tslint:disable */
/* eslint-disable */
/**
 * Invicta API DEV
 * Utilize essa documentação para realizar integração com o nosso sistema
 *
 * The version of the OpenAPI document: 2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateEventDto,
  EventResponse,
  EventsResponse,
  ResponseEventDto,
  UpdateEventDto,
} from '../models/index';
import {
    CreateEventDtoFromJSON,
    CreateEventDtoToJSON,
    EventResponseFromJSON,
    EventResponseToJSON,
    EventsResponseFromJSON,
    EventsResponseToJSON,
    ResponseEventDtoFromJSON,
    ResponseEventDtoToJSON,
    UpdateEventDtoFromJSON,
    UpdateEventDtoToJSON,
} from '../models/index';

export interface EventControllerCreateRequest {
    createEventDto: CreateEventDto;
}

export interface EventControllerFindAllRequest {
    userId?: string;
    status?: EventControllerFindAllStatusEnum;
    name?: string;
    perPage?: any;
    page?: any;
}

export interface EventControllerFindAllEnableEventsRequest {
    id: string;
}

export interface EventControllerFindOneRequest {
    id: string;
}

export interface EventControllerUpdateRequest {
    id: string;
    updateEventDto: UpdateEventDto;
}

/**
 * 
 */
export class EventApi extends runtime.BaseAPI {

    /**
     * Create an event for account
     */
    async eventControllerCreateRaw(requestParameters: EventControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ResponseEventDto>> {
        if (requestParameters.createEventDto === null || requestParameters.createEventDto === undefined) {
            throw new runtime.RequiredError('createEventDto','Required parameter requestParameters.createEventDto was null or undefined when calling eventControllerCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/event/v1/event`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateEventDtoToJSON(requestParameters.createEventDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ResponseEventDtoFromJSON(jsonValue));
    }

    /**
     * Create an event for account
     */
    async eventControllerCreate(requestParameters: EventControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ResponseEventDto> {
        const response = await this.eventControllerCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get an events with filter
     */
    async eventControllerFindAllRaw(requestParameters: EventControllerFindAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventsResponse>> {
        const queryParameters: any = {};

        if (requestParameters.userId !== undefined) {
            queryParameters['userId'] = requestParameters.userId;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['perPage'] = requestParameters.perPage;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/event/v1/event`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventsResponseFromJSON(jsonValue));
    }

    /**
     * Get an events with filter
     */
    async eventControllerFindAll(requestParameters: EventControllerFindAllRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventsResponse> {
        const response = await this.eventControllerFindAllRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all active events
     */
    async eventControllerFindAllEnableEventsRaw(requestParameters: EventControllerFindAllEnableEventsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling eventControllerFindAllEnableEvents.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/event/v1/event/get-all-active-events/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Get all active events
     */
    async eventControllerFindAllEnableEvents(requestParameters: EventControllerFindAllEnableEventsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.eventControllerFindAllEnableEventsRaw(requestParameters, initOverrides);
    }

    /**
     * Find an event especific
     */
    async eventControllerFindOneRaw(requestParameters: EventControllerFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling eventControllerFindOne.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/event/v1/event/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventResponseFromJSON(jsonValue));
    }

    /**
     * Find an event especific
     */
    async eventControllerFindOne(requestParameters: EventControllerFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventResponse> {
        const response = await this.eventControllerFindOneRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update an event by ID
     */
    async eventControllerUpdateRaw(requestParameters: EventControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ResponseEventDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling eventControllerUpdate.');
        }

        if (requestParameters.updateEventDto === null || requestParameters.updateEventDto === undefined) {
            throw new runtime.RequiredError('updateEventDto','Required parameter requestParameters.updateEventDto was null or undefined when calling eventControllerUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/event/v1/event/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateEventDtoToJSON(requestParameters.updateEventDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ResponseEventDtoFromJSON(jsonValue));
    }

    /**
     * Update an event by ID
     */
    async eventControllerUpdate(requestParameters: EventControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ResponseEventDto> {
        const response = await this.eventControllerUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const EventControllerFindAllStatusEnum = {
    Enable: 'ENABLE',
    Disable: 'DISABLE'
} as const;
export type EventControllerFindAllStatusEnum = typeof EventControllerFindAllStatusEnum[keyof typeof EventControllerFindAllStatusEnum];