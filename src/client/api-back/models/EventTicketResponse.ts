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
 * @interface EventTicketResponse
 */
export interface EventTicketResponse {
    /**
     * ID do ticket evento (UUID)
     * @type {string}
     * @memberof EventTicketResponse
     */
    id?: string;
    /**
     * ID sequencial do ingresso
     * @type {number}
     * @memberof EventTicketResponse
     */
    sequential?: number;
    /**
     * ID da conta associada ao ticket (UUID)
     * @type {string}
     * @memberof EventTicketResponse
     */
    accountId?: string;
    /**
     * ID do evento associado ao ticket (UUID)
     * @type {string}
     * @memberof EventTicketResponse
     */
    eventId?: string;
    /**
     * Nome do ticket
     * @type {string}
     * @memberof EventTicketResponse
     */
    name?: string;
    /**
     * 
     * @type {object}
     * @memberof EventTicketResponse
     */
    price?: object;
    /**
     * 
     * @type {object}
     * @memberof EventTicketResponse
     */
    priceBefore?: object;
    /**
     * Status do ingresso
     * @type {string}
     * @memberof EventTicketResponse
     */
    status?: EventTicketResponseStatusEnum;
    /**
     * Cor do ingresso
     * @type {string}
     * @memberof EventTicketResponse
     */
    color?: string;
    /**
     * Número de convidados
     * @type {number}
     * @memberof EventTicketResponse
     */
    guest?: number;
    /**
     * Data de criação
     * @type {Date}
     * @memberof EventTicketResponse
     */
    createdAt?: Date;
    /**
     * Data de atualização
     * @type {Date}
     * @memberof EventTicketResponse
     */
    updatedAt?: Date;
    /**
     * Data de exclusão (se aplicável)
     * @type {Date}
     * @memberof EventTicketResponse
     */
    deletedAt?: Date;
}


/**
 * @export
 */
export const EventTicketResponseStatusEnum = {
    Enable: 'ENABLE',
    Disable: 'DISABLE'
} as const;
export type EventTicketResponseStatusEnum = typeof EventTicketResponseStatusEnum[keyof typeof EventTicketResponseStatusEnum];


/**
 * Check if a given object implements the EventTicketResponse interface.
 */
export function instanceOfEventTicketResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EventTicketResponseFromJSON(json: any): EventTicketResponse {
    return EventTicketResponseFromJSONTyped(json, false);
}

export function EventTicketResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventTicketResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'sequential': !exists(json, 'sequential') ? undefined : json['sequential'],
        'accountId': !exists(json, 'accountId') ? undefined : json['accountId'],
        'eventId': !exists(json, 'eventId') ? undefined : json['eventId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'price': !exists(json, 'price') ? undefined : json['price'],
        'priceBefore': !exists(json, 'priceBefore') ? undefined : json['priceBefore'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'color': !exists(json, 'color') ? undefined : json['color'],
        'guest': !exists(json, 'guest') ? undefined : json['guest'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'deletedAt': !exists(json, 'deletedAt') ? undefined : (new Date(json['deletedAt'])),
    };
}

export function EventTicketResponseToJSON(value?: EventTicketResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'sequential': value.sequential,
        'accountId': value.accountId,
        'eventId': value.eventId,
        'name': value.name,
        'price': value.price,
        'priceBefore': value.priceBefore,
        'status': value.status,
        'color': value.color,
        'guest': value.guest,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'deletedAt': value.deletedAt === undefined ? undefined : (value.deletedAt.toISOString()),
    };
}
