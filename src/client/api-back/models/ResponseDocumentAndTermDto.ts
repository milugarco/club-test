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
 * @interface ResponseDocumentAndTermDto
 */
export interface ResponseDocumentAndTermDto {
    /**
     * ID do documento
     * @type {string}
     * @memberof ResponseDocumentAndTermDto
     */
    id: string;
    /**
     * ID da conta associada ao documento
     * @type {string}
     * @memberof ResponseDocumentAndTermDto
     */
    accountId: string;
    /**
     * Nome do documento
     * @type {string}
     * @memberof ResponseDocumentAndTermDto
     */
    name: string;
    /**
     * Caminho do arquivo
     * @type {string}
     * @memberof ResponseDocumentAndTermDto
     */
    path: string;
    /**
     * Arquivo em formato binário
     * @type {Blob}
     * @memberof ResponseDocumentAndTermDto
     */
    file: Blob;
    /**
     * Data de vencimento
     * @type {Date}
     * @memberof ResponseDocumentAndTermDto
     */
    deadlineAt: Date;
    /**
     * Indica se o documento deve ser fechado automaticamente
     * @type {boolean}
     * @memberof ResponseDocumentAndTermDto
     */
    autoClose: boolean;
    /**
     * Localidade do documento
     * @type {string}
     * @memberof ResponseDocumentAndTermDto
     */
    locale: string;
    /**
     * Habilitar sequência
     * @type {boolean}
     * @memberof ResponseDocumentAndTermDto
     */
    sequenceEnabled: boolean;
    /**
     * Intervalo de lembrete
     * @type {string}
     * @memberof ResponseDocumentAndTermDto
     */
    remindInterval: string;
    /**
     * Bloquear após recusa
     * @type {boolean}
     * @memberof ResponseDocumentAndTermDto
     */
    blockAfterRefusal: boolean;
    /**
     * Data de criação
     * @type {Date}
     * @memberof ResponseDocumentAndTermDto
     */
    createdAt: Date;
    /**
     * Data de atualização
     * @type {Date}
     * @memberof ResponseDocumentAndTermDto
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the ResponseDocumentAndTermDto interface.
 */
export function instanceOfResponseDocumentAndTermDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "accountId" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "file" in value;
    isInstance = isInstance && "deadlineAt" in value;
    isInstance = isInstance && "autoClose" in value;
    isInstance = isInstance && "locale" in value;
    isInstance = isInstance && "sequenceEnabled" in value;
    isInstance = isInstance && "remindInterval" in value;
    isInstance = isInstance && "blockAfterRefusal" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function ResponseDocumentAndTermDtoFromJSON(json: any): ResponseDocumentAndTermDto {
    return ResponseDocumentAndTermDtoFromJSONTyped(json, false);
}

export function ResponseDocumentAndTermDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseDocumentAndTermDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'accountId': json['accountId'],
        'name': json['name'],
        'path': json['path'],
        'file': json['file'],
        'deadlineAt': (new Date(json['deadlineAt'])),
        'autoClose': json['autoClose'],
        'locale': json['locale'],
        'sequenceEnabled': json['sequenceEnabled'],
        'remindInterval': json['remindInterval'],
        'blockAfterRefusal': json['blockAfterRefusal'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function ResponseDocumentAndTermDtoToJSON(value?: ResponseDocumentAndTermDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'accountId': value.accountId,
        'name': value.name,
        'path': value.path,
        'file': value.file,
        'deadlineAt': (value.deadlineAt.toISOString()),
        'autoClose': value.autoClose,
        'locale': value.locale,
        'sequenceEnabled': value.sequenceEnabled,
        'remindInterval': value.remindInterval,
        'blockAfterRefusal': value.blockAfterRefusal,
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
    };
}

