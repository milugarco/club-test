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
import type { EventTicketResponse } from './EventTicketResponse';
import {
    EventTicketResponseFromJSON,
    EventTicketResponseFromJSONTyped,
    EventTicketResponseToJSON,
} from './EventTicketResponse';
import type { ResponseUserParticipantDto } from './ResponseUserParticipantDto';
import {
    ResponseUserParticipantDtoFromJSON,
    ResponseUserParticipantDtoFromJSONTyped,
    ResponseUserParticipantDtoToJSON,
} from './ResponseUserParticipantDto';

/**
 * 
 * @export
 * @interface EventParticipantResponse
 */
export interface EventParticipantResponse {
    /**
     * ID do participante (UUID)
     * @type {string}
     * @memberof EventParticipantResponse
     */
    id?: string;
    /**
     * ID sequencial do participante
     * @type {number}
     * @memberof EventParticipantResponse
     */
    sequential?: number;
    /**
     * ID da conta associada ao participante (UUID)
     * @type {string}
     * @memberof EventParticipantResponse
     */
    accountId?: string;
    /**
     * ID do evento associado ao participante (UUID)
     * @type {string}
     * @memberof EventParticipantResponse
     */
    eventId?: string;
    /**
     * ID do ingresso associada ao participante (UUID)
     * @type {string}
     * @memberof EventParticipantResponse
     */
    eventTicketId?: string;
    /**
     * ID do ingresso associada ao participante (UUID)
     * @type {string}
     * @memberof EventParticipantResponse
     */
    eventTicketGuestId?: string;
    /**
     * ID do usuário associado ao participante
     * @type {string}
     * @memberof EventParticipantResponse
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof EventParticipantResponse
     */
    status?: EventParticipantResponseStatusEnum;
    /**
     * QRcode do participante
     * @type {string}
     * @memberof EventParticipantResponse
     */
    qrCode?: string;
    /**
     * Data de criação do evento
     * @type {Date}
     * @memberof EventParticipantResponse
     */
    createdAt?: Date;
    /**
     * Data de atualização do evento
     * @type {Date}
     * @memberof EventParticipantResponse
     */
    updatedAt?: Date;
    /**
     * Data de exclusão do evento (se aplicável)
     * @type {Date}
     * @memberof EventParticipantResponse
     */
    deletedAt?: Date;
    /**
     * 
     * @type {ResponseUserParticipantDto}
     * @memberof EventParticipantResponse
     */
    user?: ResponseUserParticipantDto;
    /**
     * 
     * @type {EventTicketResponse}
     * @memberof EventParticipantResponse
     */
    eventTicket?: EventTicketResponse;
}


/**
 * @export
 */
export const EventParticipantResponseStatusEnum = {
    AwaitingPayment: 'AWAITING_PAYMENT',
    CheckInEarly: 'CHECK_IN_EARLY',
    CheckIn: 'CHECK_IN',
    CheckOut: 'CHECK_OUT',
    Canceled: 'CANCELED',
    Enable: 'ENABLE'
} as const;
export type EventParticipantResponseStatusEnum = typeof EventParticipantResponseStatusEnum[keyof typeof EventParticipantResponseStatusEnum];


/**
 * Check if a given object implements the EventParticipantResponse interface.
 */
export function instanceOfEventParticipantResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EventParticipantResponseFromJSON(json: any): EventParticipantResponse {
    return EventParticipantResponseFromJSONTyped(json, false);
}

export function EventParticipantResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventParticipantResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'sequential': !exists(json, 'sequential') ? undefined : json['sequential'],
        'accountId': !exists(json, 'accountId') ? undefined : json['accountId'],
        'eventId': !exists(json, 'eventId') ? undefined : json['eventId'],
        'eventTicketId': !exists(json, 'eventTicketId') ? undefined : json['eventTicketId'],
        'eventTicketGuestId': !exists(json, 'eventTicketGuestId') ? undefined : json['eventTicketGuestId'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'qrCode': !exists(json, 'qrCode') ? undefined : json['qrCode'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'deletedAt': !exists(json, 'deletedAt') ? undefined : (new Date(json['deletedAt'])),
        'user': !exists(json, 'user') ? undefined : ResponseUserParticipantDtoFromJSON(json['user']),
        'eventTicket': !exists(json, 'eventTicket') ? undefined : EventTicketResponseFromJSON(json['eventTicket']),
    };
}

export function EventParticipantResponseToJSON(value?: EventParticipantResponse | null): any {
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
        'eventTicketId': value.eventTicketId,
        'eventTicketGuestId': value.eventTicketGuestId,
        'userId': value.userId,
        'status': value.status,
        'qrCode': value.qrCode,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'deletedAt': value.deletedAt === undefined ? undefined : (value.deletedAt.toISOString()),
        'user': ResponseUserParticipantDtoToJSON(value.user),
        'eventTicket': EventTicketResponseToJSON(value.eventTicket),
    };
}

