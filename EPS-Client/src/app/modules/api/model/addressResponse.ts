/**
 * Agency Pulse API v1.0
 * API für das Agency Pulse - Einsatzplanungssystem
 *
 * OpenAPI spec version: 1.0
 * Contact: development@de.cpm-int.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface AddressResponse { 
    id?: string;
    street?: string;
    city?: string;
    postalcode?: string;
    longitude?: number;
    latitude?: number;
    detailLevelId?: number;
    priority?: number;
}