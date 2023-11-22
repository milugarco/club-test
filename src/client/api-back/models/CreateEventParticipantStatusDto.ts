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
 * @interface CreateEventParticipantStatusDto
 */
export interface CreateEventParticipantStatusDto {
    /**
     * Event ticket guest status
     * @type {string}
     * @memberof CreateEventParticipantStatusDto
     */
    status: CreateEventParticipantStatusDtoStatusEnum;
    /**
     * ID do evento associado ao ticket (UUID)
     * @type {string}
     * @memberof CreateEventParticipantStatusDto
     */
    eventParticipantId: string;
}


/**
 * @export
 */
export const CreateEventParticipantStatusDtoStatusEnum = {
    Checkin: 'CHECKIN',
    Checkout: 'CHECKOUT',
    Pending: 'PENDING'
} as const;
export type CreateEventParticipantStatusDtoStatusEnum = typeof CreateEventParticipantStatusDtoStatusEnum[keyof typeof CreateEventParticipantStatusDtoStatusEnum];


/**
 * Check if a given object implements the CreateEventParticipantStatusDto interface.
 */
export function instanceOfCreateEventParticipantStatusDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "eventParticipantId" in value;

    return isInstance;
}

export function CreateEventParticipantStatusDtoFromJSON(json: any): CreateEventParticipantStatusDto {
    return CreateEventParticipantStatusDtoFromJSONTyped(json, false);
}

export function CreateEventParticipantStatusDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateEventParticipantStatusDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'eventParticipantId': json['eventParticipantId'],
    };
}

export function CreateEventParticipantStatusDtoToJSON(value?: CreateEventParticipantStatusDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'eventParticipantId': value.eventParticipantId,
    };
}

