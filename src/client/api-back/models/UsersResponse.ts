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
import type { PageInfo } from './PageInfo';
import {
    PageInfoFromJSON,
    PageInfoFromJSONTyped,
    PageInfoToJSON,
} from './PageInfo';
import type { UserWithoutPassword } from './UserWithoutPassword';
import {
    UserWithoutPasswordFromJSON,
    UserWithoutPasswordFromJSONTyped,
    UserWithoutPasswordToJSON,
} from './UserWithoutPassword';

/**
 * 
 * @export
 * @interface UsersResponse
 */
export interface UsersResponse {
    /**
     * 
     * @type {Array<UserWithoutPassword>}
     * @memberof UsersResponse
     */
    data: Array<UserWithoutPassword>;
    /**
     * 
     * @type {PageInfo}
     * @memberof UsersResponse
     */
    pageInfo: PageInfo | null;
}

/**
 * Check if a given object implements the UsersResponse interface.
 */
export function instanceOfUsersResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "pageInfo" in value;

    return isInstance;
}

export function UsersResponseFromJSON(json: any): UsersResponse {
    return UsersResponseFromJSONTyped(json, false);
}

export function UsersResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(UserWithoutPasswordFromJSON)),
        'pageInfo': PageInfoFromJSON(json['pageInfo']),
    };
}

export function UsersResponseToJSON(value?: UsersResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(UserWithoutPasswordToJSON)),
        'pageInfo': PageInfoToJSON(value.pageInfo),
    };
}

