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
 * @interface CreateUserDto
 */
export interface CreateUserDto {
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    status: CreateUserDtoStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    countryCodePhone: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    areaCodePhone: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    phoneNumber: string;
}


/**
 * @export
 */
export const CreateUserDtoStatusEnum = {
    Enable: 'ENABLE',
    Disable: 'DISABLE',
    WaitingConfirmation: 'WAITING_CONFIRMATION'
} as const;
export type CreateUserDtoStatusEnum = typeof CreateUserDtoStatusEnum[keyof typeof CreateUserDtoStatusEnum];


/**
 * Check if a given object implements the CreateUserDto interface.
 */
export function instanceOfCreateUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "countryCodePhone" in value;
    isInstance = isInstance && "areaCodePhone" in value;
    isInstance = isInstance && "phoneNumber" in value;

    return isInstance;
}

export function CreateUserDtoFromJSON(json: any): CreateUserDto {
    return CreateUserDtoFromJSONTyped(json, false);
}

export function CreateUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'status': json['status'],
        'countryCodePhone': json['countryCodePhone'],
        'areaCodePhone': json['areaCodePhone'],
        'phoneNumber': json['phoneNumber'],
    };
}

export function CreateUserDtoToJSON(value?: CreateUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'password': value.password,
        'status': value.status,
        'countryCodePhone': value.countryCodePhone,
        'areaCodePhone': value.areaCodePhone,
        'phoneNumber': value.phoneNumber,
    };
}
