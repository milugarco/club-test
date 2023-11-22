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
 * @interface CreateAccountUserDto
 */
export interface CreateAccountUserDto {
    /**
     * 
     * @type {string}
     * @memberof CreateAccountUserDto
     */
    accountId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAccountUserDto
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAccountUserDto
     */
    status: CreateAccountUserDtoStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateAccountUserDto
     */
    type: CreateAccountUserDtoTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateAccountUserDto
     */
    position: string;
}


/**
 * @export
 */
export const CreateAccountUserDtoStatusEnum = {
    Enabled: 'ENABLED',
    Disabled: 'DISABLED',
    WaitingApproval: 'WAITING_APPROVAL'
} as const;
export type CreateAccountUserDtoStatusEnum = typeof CreateAccountUserDtoStatusEnum[keyof typeof CreateAccountUserDtoStatusEnum];

/**
 * @export
 */
export const CreateAccountUserDtoTypeEnum = {
    Team: 'TEAM',
    Student: 'STUDENT'
} as const;
export type CreateAccountUserDtoTypeEnum = typeof CreateAccountUserDtoTypeEnum[keyof typeof CreateAccountUserDtoTypeEnum];


/**
 * Check if a given object implements the CreateAccountUserDto interface.
 */
export function instanceOfCreateAccountUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "accountId" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "position" in value;

    return isInstance;
}

export function CreateAccountUserDtoFromJSON(json: any): CreateAccountUserDto {
    return CreateAccountUserDtoFromJSONTyped(json, false);
}

export function CreateAccountUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAccountUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accountId': json['accountId'],
        'userId': json['userId'],
        'status': json['status'],
        'type': json['type'],
        'position': json['position'],
    };
}

export function CreateAccountUserDtoToJSON(value?: CreateAccountUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accountId': value.accountId,
        'userId': value.userId,
        'status': value.status,
        'type': value.type,
        'position': value.position,
    };
}
