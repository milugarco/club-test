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
/**
 * 
 * @export
 * @interface AddressResponse
 */
export interface AddressResponse {
    /**
     * 
     * @type {string}
     * @memberof AddressResponse
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof AddressResponse
     */
    street?: string;
    /**
     * 
     * @type {string}
     * @memberof AddressResponse
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof AddressResponse
     */
    state?: string;
    /**
     * 
     * @type {string}
     * @memberof AddressResponse
     */
    country?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AddressResponse
     */
    isActive?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AddressResponse
     */
    label?: string;
}

/**
 * Check if a given object implements the AddressResponse interface.
 */
export function instanceOfAddressResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AddressResponseFromJSON(json: any): AddressResponse {
    return AddressResponseFromJSONTyped(json, false);
}

export function AddressResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddressResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'street': !exists(json, 'street') ? undefined : json['street'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'country': !exists(json, 'country') ? undefined : json['country'],
        'isActive': !exists(json, 'isActive') ? undefined : json['isActive'],
        'label': !exists(json, 'label') ? undefined : json['label'],
    };
}

export function AddressResponseToJSON(value?: AddressResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userId': value.userId,
        'street': value.street,
        'city': value.city,
        'state': value.state,
        'country': value.country,
        'isActive': value.isActive,
        'label': value.label,
    };
}
