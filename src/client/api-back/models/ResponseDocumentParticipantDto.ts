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
 * @interface ResponseDocumentParticipantDto
 */
export interface ResponseDocumentParticipantDto {
    /**
     * ID do documento (UUID)
     * @type {string}
     * @memberof ResponseDocumentParticipantDto
     */
    id: string;
    /**
     * Número do documento
     * @type {string}
     * @memberof ResponseDocumentParticipantDto
     */
    number: string;
    /**
     * Tipo do documento
     * @type {string}
     * @memberof ResponseDocumentParticipantDto
     */
    type: string;
    /**
     * Path do documento no computador
     * @type {string}
     * @memberof ResponseDocumentParticipantDto
     */
    filePath: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseDocumentParticipantDto
     */
    status: ResponseDocumentParticipantDtoStatusEnum;
    /**
     * Data e hora da criação do documento
     * @type {Date}
     * @memberof ResponseDocumentParticipantDto
     */
    createdAt: Date;
    /**
     * Data e hora da última atualização no documento
     * @type {Date}
     * @memberof ResponseDocumentParticipantDto
     */
    updatedAt: Date;
    /**
     * Data e hora da exclusão do documento
     * @type {Date}
     * @memberof ResponseDocumentParticipantDto
     */
    deletedAt: Date;
}


/**
 * @export
 */
export const ResponseDocumentParticipantDtoStatusEnum = {
    Sent: 'SENT',
    AwaitingVerification: 'AWAITING_VERIFICATION',
    Verified: 'VERIFIED'
} as const;
export type ResponseDocumentParticipantDtoStatusEnum = typeof ResponseDocumentParticipantDtoStatusEnum[keyof typeof ResponseDocumentParticipantDtoStatusEnum];


/**
 * Check if a given object implements the ResponseDocumentParticipantDto interface.
 */
export function instanceOfResponseDocumentParticipantDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "number" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "filePath" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "deletedAt" in value;

    return isInstance;
}

export function ResponseDocumentParticipantDtoFromJSON(json: any): ResponseDocumentParticipantDto {
    return ResponseDocumentParticipantDtoFromJSONTyped(json, false);
}

export function ResponseDocumentParticipantDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseDocumentParticipantDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'number': json['number'],
        'type': json['type'],
        'filePath': json['filePath'],
        'status': json['status'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'deletedAt': (new Date(json['deletedAt'])),
    };
}

export function ResponseDocumentParticipantDtoToJSON(value?: ResponseDocumentParticipantDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'number': value.number,
        'type': value.type,
        'filePath': value.filePath,
        'status': value.status,
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
        'deletedAt': (value.deletedAt.toISOString()),
    };
}
