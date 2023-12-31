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
  CreateInitialSubscribeDto,
  LoginResponseDto,
} from '../models/index';
import {
    CreateInitialSubscribeDtoFromJSON,
    CreateInitialSubscribeDtoToJSON,
    LoginResponseDtoFromJSON,
    LoginResponseDtoToJSON,
} from '../models/index';

export interface InitialSubscribeControllerCreateRequest {
    createInitialSubscribeDto: CreateInitialSubscribeDto;
}

/**
 * 
 */
export class InitialSubscribeApi extends runtime.BaseAPI {

    /**
     * Create Initial Subscribe
     */
    async initialSubscribeControllerCreateRaw(requestParameters: InitialSubscribeControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginResponseDto>> {
        if (requestParameters.createInitialSubscribeDto === null || requestParameters.createInitialSubscribeDto === undefined) {
            throw new runtime.RequiredError('createInitialSubscribeDto','Required parameter requestParameters.createInitialSubscribeDto was null or undefined when calling initialSubscribeControllerCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/subscribe/v1/initial-subscribe`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateInitialSubscribeDtoToJSON(requestParameters.createInitialSubscribeDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseDtoFromJSON(jsonValue));
    }

    /**
     * Create Initial Subscribe
     */
    async initialSubscribeControllerCreate(requestParameters: InitialSubscribeControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginResponseDto> {
        const response = await this.initialSubscribeControllerCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
