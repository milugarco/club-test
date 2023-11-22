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
 * @interface ResponseEventConfigDto
 */
export interface ResponseEventConfigDto {
    /**
     * ID
     * @type {string}
     * @memberof ResponseEventConfigDto
     */
    id: string;
    /**
     * ID do evento
     * @type {string}
     * @memberof ResponseEventConfigDto
     */
    eventId: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseEventConfigDto
     */
    type: ResponseEventConfigDtoTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ResponseEventConfigDto
     */
    status: ResponseEventConfigDtoStatusEnum;
    /**
     * Data de criação do evento
     * @type {Date}
     * @memberof ResponseEventConfigDto
     */
    createdAt: Date;
    /**
     * Data de atualização do evento
     * @type {Date}
     * @memberof ResponseEventConfigDto
     */
    updatedAt: Date;
    /**
     * Data de exclusão do evento (se aplicável)
     * @type {Date}
     * @memberof ResponseEventConfigDto
     */
    deletedAt: Date;
}


/**
 * @export
 */
export const ResponseEventConfigDtoTypeEnum = {
    PrintAutomatic: 'PRINT_AUTOMATIC',
    SkipStepDocument: 'SKIP_STEP_DOCUMENT',
    Award: 'AWARD'
} as const;
export type ResponseEventConfigDtoTypeEnum = typeof ResponseEventConfigDtoTypeEnum[keyof typeof ResponseEventConfigDtoTypeEnum];

/**
 * @export
 */
export const ResponseEventConfigDtoStatusEnum = {
    Enable: 'ENABLE',
    Disable: 'DISABLE'
} as const;
export type ResponseEventConfigDtoStatusEnum = typeof ResponseEventConfigDtoStatusEnum[keyof typeof ResponseEventConfigDtoStatusEnum];


/**
 * Check if a given object implements the ResponseEventConfigDto interface.
 */
export function instanceOfResponseEventConfigDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "eventId" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "deletedAt" in value;

    return isInstance;
}

export function ResponseEventConfigDtoFromJSON(json: any): ResponseEventConfigDto {
    return ResponseEventConfigDtoFromJSONTyped(json, false);
}

export function ResponseEventConfigDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseEventConfigDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'eventId': json['eventId'],
        'type': json['type'],
        'status': json['status'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'deletedAt': (new Date(json['deletedAt'])),
    };
}

export function ResponseEventConfigDtoToJSON(value?: ResponseEventConfigDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'eventId': value.eventId,
        'type': value.type,
        'status': value.status,
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
        'deletedAt': (value.deletedAt.toISOString()),
    };
}

