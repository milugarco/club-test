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
 * @interface UserInitialSubscribeClub
 */
export interface UserInitialSubscribeClub {
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    countryCodePhone: string;
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    areaCodePhone: string;
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    phoneNumber: string;
    /**
     * 
     * @type {string}
     * @memberof UserInitialSubscribeClub
     */
    document: string;
    /**
     * Arquivo em formato binário
     * @type {Blob}
     * @memberof UserInitialSubscribeClub
     */
    photo: Blob;
}

/**
 * Check if a given object implements the UserInitialSubscribeClub interface.
 */
export function instanceOfUserInitialSubscribeClub(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "countryCodePhone" in value;
    isInstance = isInstance && "areaCodePhone" in value;
    isInstance = isInstance && "phoneNumber" in value;
    isInstance = isInstance && "document" in value;
    isInstance = isInstance && "photo" in value;

    return isInstance;
}

export function UserInitialSubscribeClubFromJSON(json: any): UserInitialSubscribeClub {
    return UserInitialSubscribeClubFromJSONTyped(json, false);
}

export function UserInitialSubscribeClubFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserInitialSubscribeClub {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'password': json['password'],
        'countryCodePhone': json['countryCodePhone'],
        'areaCodePhone': json['areaCodePhone'],
        'phoneNumber': json['phoneNumber'],
        'document': json['document'],
        'photo': json['photo'],
    };
}

export function UserInitialSubscribeClubToJSON(value?: UserInitialSubscribeClub | null): any {
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
        'countryCodePhone': value.countryCodePhone,
        'areaCodePhone': value.areaCodePhone,
        'phoneNumber': value.phoneNumber,
        'document': value.document,
        'photo': value.photo,
    };
}

