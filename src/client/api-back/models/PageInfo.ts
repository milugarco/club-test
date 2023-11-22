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
 * @interface PageInfo
 */
export interface PageInfo {
    /**
     * 
     * @type {number}
     * @memberof PageInfo
     */
    totalItems: number;
    /**
     * 
     * @type {number}
     * @memberof PageInfo
     */
    totalPages: number;
    /**
     * 
     * @type {number}
     * @memberof PageInfo
     */
    remainingPages: number;
    /**
     * 
     * @type {object}
     * @memberof PageInfo
     */
    nextPage: object | null;
    /**
     * 
     * @type {object}
     * @memberof PageInfo
     */
    prevPage: object | null;
}

/**
 * Check if a given object implements the PageInfo interface.
 */
export function instanceOfPageInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "totalItems" in value;
    isInstance = isInstance && "totalPages" in value;
    isInstance = isInstance && "remainingPages" in value;
    isInstance = isInstance && "nextPage" in value;
    isInstance = isInstance && "prevPage" in value;

    return isInstance;
}

export function PageInfoFromJSON(json: any): PageInfo {
    return PageInfoFromJSONTyped(json, false);
}

export function PageInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'totalItems': json['totalItems'],
        'totalPages': json['totalPages'],
        'remainingPages': json['remainingPages'],
        'nextPage': json['nextPage'],
        'prevPage': json['prevPage'],
    };
}

export function PageInfoToJSON(value?: PageInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'totalItems': value.totalItems,
        'totalPages': value.totalPages,
        'remainingPages': value.remainingPages,
        'nextPage': value.nextPage,
        'prevPage': value.prevPage,
    };
}
