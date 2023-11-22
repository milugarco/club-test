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
 * @interface AccountUserResponse
 */
export interface AccountUserResponse {
    /**
     * 
     * @type {string}
     * @memberof AccountUserResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AccountUserResponse
     */
    accountId?: string;
    /**
     * 
     * @type {string}
     * @memberof AccountUserResponse
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof AccountUserResponse
     */
    status?: AccountUserResponseStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof AccountUserResponse
     */
    type?: AccountUserResponseTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AccountUserResponse
     */
    position?: string;
    /**
     * 
     * @type {Date}
     * @memberof AccountUserResponse
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AccountUserResponse
     */
    updatedAt?: Date;
}


/**
 * @export
 */
export const AccountUserResponseStatusEnum = {
    Enabled: 'ENABLED',
    Disabled: 'DISABLED',
    WaitingApproval: 'WAITING_APPROVAL'
} as const;
export type AccountUserResponseStatusEnum = typeof AccountUserResponseStatusEnum[keyof typeof AccountUserResponseStatusEnum];

/**
 * @export
 */
export const AccountUserResponseTypeEnum = {
    Team: 'TEAM',
    Student: 'STUDENT'
} as const;
export type AccountUserResponseTypeEnum = typeof AccountUserResponseTypeEnum[keyof typeof AccountUserResponseTypeEnum];


/**
 * Check if a given object implements the AccountUserResponse interface.
 */
export function instanceOfAccountUserResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AccountUserResponseFromJSON(json: any): AccountUserResponse {
    return AccountUserResponseFromJSONTyped(json, false);
}

export function AccountUserResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountUserResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'accountId': !exists(json, 'accountId') ? undefined : json['accountId'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'position': !exists(json, 'position') ? undefined : json['position'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
    };
}

export function AccountUserResponseToJSON(value?: AccountUserResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'accountId': value.accountId,
        'userId': value.userId,
        'status': value.status,
        'type': value.type,
        'position': value.position,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}
