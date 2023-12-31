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
 * @interface ResponseAccountUserDto
 */
export interface ResponseAccountUserDto {
    /**
     * 
     * @type {string}
     * @memberof ResponseAccountUserDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseAccountUserDto
     */
    accountId: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseAccountUserDto
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseAccountUserDto
     */
    status: ResponseAccountUserDtoStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof ResponseAccountUserDto
     */
    type: ResponseAccountUserDtoTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ResponseAccountUserDto
     */
    position: string;
    /**
     * 
     * @type {Date}
     * @memberof ResponseAccountUserDto
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof ResponseAccountUserDto
     */
    updatedAt: Date;
}


/**
 * @export
 */
export const ResponseAccountUserDtoStatusEnum = {
    Enabled: 'ENABLED',
    Disabled: 'DISABLED',
    WaitingApproval: 'WAITING_APPROVAL'
} as const;
export type ResponseAccountUserDtoStatusEnum = typeof ResponseAccountUserDtoStatusEnum[keyof typeof ResponseAccountUserDtoStatusEnum];

/**
 * @export
 */
export const ResponseAccountUserDtoTypeEnum = {
    Team: 'TEAM',
    Student: 'STUDENT'
} as const;
export type ResponseAccountUserDtoTypeEnum = typeof ResponseAccountUserDtoTypeEnum[keyof typeof ResponseAccountUserDtoTypeEnum];


/**
 * Check if a given object implements the ResponseAccountUserDto interface.
 */
export function instanceOfResponseAccountUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "accountId" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "position" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function ResponseAccountUserDtoFromJSON(json: any): ResponseAccountUserDto {
    return ResponseAccountUserDtoFromJSONTyped(json, false);
}

export function ResponseAccountUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseAccountUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'accountId': json['accountId'],
        'userId': json['userId'],
        'status': json['status'],
        'type': json['type'],
        'position': json['position'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function ResponseAccountUserDtoToJSON(value?: ResponseAccountUserDto | null): any {
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
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
    };
}

