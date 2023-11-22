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
 * @interface UpdateAccountDto
 */
export interface UpdateAccountDto {
    /**
     * The name of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    name?: string;
    /**
     * The corporate name of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    corporateName?: string;
    /**
     * The fantasy name of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    fantasyName?: string;
    /**
     * The segment of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    segment?: string;
    /**
     * The document number of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    document?: string;
    /**
     * The type of document (CNPJ)
     * @type {string}
     * @memberof UpdateAccountDto
     */
    documentType?: string;
    /**
     * The domain of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    domain?: string;
    /**
     * The email of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    email?: string;
    /**
     * The street address of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    street?: string;
    /**
     * The state of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    state?: string;
    /**
     * The city of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    city?: string;
    /**
     * The neighborhood of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    neighborhood?: string;
    /**
     * The country of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    country?: string;
    /**
     * The ZIP code of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    zipCode?: string;
    /**
     * The complement of the address
     * @type {string}
     * @memberof UpdateAccountDto
     */
    complement?: string;
    /**
     * The status of the account
     * @type {string}
     * @memberof UpdateAccountDto
     */
    status?: UpdateAccountDtoStatusEnum;
    /**
     * The country code of the phone number
     * @type {string}
     * @memberof UpdateAccountDto
     */
    countryCodePhone?: string;
    /**
     * The area code of the phone number
     * @type {string}
     * @memberof UpdateAccountDto
     */
    areaCodePhone?: string;
    /**
     * The phone number
     * @type {string}
     * @memberof UpdateAccountDto
     */
    phoneNumber?: string;
}


/**
 * @export
 */
export const UpdateAccountDtoStatusEnum = {
    Enabled: 'ENABLED',
    Disabled: 'DISABLED',
    WaitingApproval: 'WAITING_APPROVAL'
} as const;
export type UpdateAccountDtoStatusEnum = typeof UpdateAccountDtoStatusEnum[keyof typeof UpdateAccountDtoStatusEnum];


/**
 * Check if a given object implements the UpdateAccountDto interface.
 */
export function instanceOfUpdateAccountDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateAccountDtoFromJSON(json: any): UpdateAccountDto {
    return UpdateAccountDtoFromJSONTyped(json, false);
}

export function UpdateAccountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateAccountDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'corporateName': !exists(json, 'corporateName') ? undefined : json['corporateName'],
        'fantasyName': !exists(json, 'fantasyName') ? undefined : json['fantasyName'],
        'segment': !exists(json, 'segment') ? undefined : json['segment'],
        'document': !exists(json, 'document') ? undefined : json['document'],
        'documentType': !exists(json, 'documentType') ? undefined : json['documentType'],
        'domain': !exists(json, 'domain') ? undefined : json['domain'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'street': !exists(json, 'street') ? undefined : json['street'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'neighborhood': !exists(json, 'neighborhood') ? undefined : json['neighborhood'],
        'country': !exists(json, 'country') ? undefined : json['country'],
        'zipCode': !exists(json, 'zipCode') ? undefined : json['zipCode'],
        'complement': !exists(json, 'complement') ? undefined : json['complement'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'countryCodePhone': !exists(json, 'countryCodePhone') ? undefined : json['countryCodePhone'],
        'areaCodePhone': !exists(json, 'areaCodePhone') ? undefined : json['areaCodePhone'],
        'phoneNumber': !exists(json, 'phoneNumber') ? undefined : json['phoneNumber'],
    };
}

export function UpdateAccountDtoToJSON(value?: UpdateAccountDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'corporateName': value.corporateName,
        'fantasyName': value.fantasyName,
        'segment': value.segment,
        'document': value.document,
        'documentType': value.documentType,
        'domain': value.domain,
        'email': value.email,
        'street': value.street,
        'state': value.state,
        'city': value.city,
        'neighborhood': value.neighborhood,
        'country': value.country,
        'zipCode': value.zipCode,
        'complement': value.complement,
        'status': value.status,
        'countryCodePhone': value.countryCodePhone,
        'areaCodePhone': value.areaCodePhone,
        'phoneNumber': value.phoneNumber,
    };
}

