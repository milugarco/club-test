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

import { exists, mapValues } from '../runtime';
import type { CreateAddressDto } from './CreateAddressDto';
import {
    CreateAddressDtoFromJSON,
    CreateAddressDtoFromJSONTyped,
    CreateAddressDtoToJSON,
} from './CreateAddressDto';
import type { PageInfo } from './PageInfo';
import {
    PageInfoFromJSON,
    PageInfoFromJSONTyped,
    PageInfoToJSON,
} from './PageInfo';

/**
 * 
 * @export
 * @interface AddressesResponse
 */
export interface AddressesResponse {
    /**
     * 
     * @type {Array<CreateAddressDto>}
     * @memberof AddressesResponse
     */
    data: Array<CreateAddressDto>;
    /**
     * 
     * @type {PageInfo}
     * @memberof AddressesResponse
     */
    pageInfo: PageInfo | null;
}

/**
 * Check if a given object implements the AddressesResponse interface.
 */
export function instanceOfAddressesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "pageInfo" in value;

    return isInstance;
}

export function AddressesResponseFromJSON(json: any): AddressesResponse {
    return AddressesResponseFromJSONTyped(json, false);
}

export function AddressesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddressesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(CreateAddressDtoFromJSON)),
        'pageInfo': PageInfoFromJSON(json['pageInfo']),
    };
}

export function AddressesResponseToJSON(value?: AddressesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(CreateAddressDtoToJSON)),
        'pageInfo': PageInfoToJSON(value.pageInfo),
    };
}

