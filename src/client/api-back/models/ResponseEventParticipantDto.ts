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
 * @interface ResponseEventParticipantDto
 */
export interface ResponseEventParticipantDto {
    /**
     * ID do participante (UUID)
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    id: string;
    /**
     * ID sequencial do participante
     * @type {number}
     * @memberof ResponseEventParticipantDto
     */
    sequential: number;
    /**
     * ID da conta associada ao participante (UUID)
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    accountId: string;
    /**
     * ID do evento associado ao participante (UUID)
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    eventId: string;
    /**
     * ID do ingresso associada ao participante (UUID)
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    eventTicketId: string;
    /**
     * ID do ingresso associada ao participante (UUID)
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    eventTicketGuestId: string;
    /**
     * ID do usuário associado ao participante
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    status: ResponseEventParticipantDtoStatusEnum;
    /**
     * QRcode do participante
     * @type {string}
     * @memberof ResponseEventParticipantDto
     */
    qrCode: string;
    /**
     * Data de criação do evento
     * @type {Date}
     * @memberof ResponseEventParticipantDto
     */
    createdAt: Date;
    /**
     * Data de atualização do evento
     * @type {Date}
     * @memberof ResponseEventParticipantDto
     */
    updatedAt: Date;
    /**
     * Data de exclusão do evento (se aplicável)
     * @type {Date}
     * @memberof ResponseEventParticipantDto
     */
    deletedAt: Date;
    /**
     * 
     * @type {ResponseUserParticipantDto}
     * @memberof ResponseEventParticipantDto
     */
    user: ResponseUserParticipantDto;
    /**
     * 
     * @type {EventTicketResponse}
     * @memberof ResponseEventParticipantDto
     */
    eventTicket: EventTicketResponse;
}


/**
 * @export
 */
export const ResponseEventParticipantDtoStatusEnum = {
    AwaitingPayment: 'AWAITING_PAYMENT',
    CheckInEarly: 'CHECK_IN_EARLY',
    CheckIn: 'CHECK_IN',
    CheckOut: 'CHECK_OUT',
    Canceled: 'CANCELED',
    Enable: 'ENABLE'
} as const;
export type ResponseEventParticipantDtoStatusEnum = typeof ResponseEventParticipantDtoStatusEnum[keyof typeof ResponseEventParticipantDtoStatusEnum];


/**
 * Check if a given object implements the ResponseEventParticipantDto interface.
 */
export function instanceOfResponseEventParticipantDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "sequential" in value;
    isInstance = isInstance && "accountId" in value;
    isInstance = isInstance && "eventId" in value;
    isInstance = isInstance && "eventTicketId" in value;
    isInstance = isInstance && "eventTicketGuestId" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "qrCode" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "deletedAt" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "eventTicket" in value;

    return isInstance;
}

export function ResponseEventParticipantDtoFromJSON(json: any): ResponseEventParticipantDto {
    return ResponseEventParticipantDtoFromJSONTyped(json, false);
}

export function ResponseEventParticipantDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseEventParticipantDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'sequential': json['sequential'],
        'accountId': json['accountId'],
        'eventId': json['eventId'],
        'eventTicketId': json['eventTicketId'],
        'eventTicketGuestId': json['eventTicketGuestId'],
        'userId': json['userId'],
        'status': json['status'],
        'qrCode': json['qrCode'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'deletedAt': (new Date(json['deletedAt'])),
        'user': ResponseUserParticipantDtoFromJSON(json['user']),
        'eventTicket': EventTicketResponseFromJSON(json['eventTicket']),
    };
}

export function ResponseEventParticipantDtoToJSON(value?: ResponseEventParticipantDto | null): any {
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
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
        'deletedAt': (value.deletedAt.toISOString()),
        'user': ResponseUserParticipantDtoToJSON(value.user),
        'eventTicket': EventTicketResponseToJSON(value.eventTicket),
    };
}

