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
import { AddressResponse } from './addressResponse';
import { AreaResponse } from './areaResponse';
import { ChainResponse } from './chainResponse';

export interface LocationResponse { 
    id?: string;
    name?: string;
    internalNumber?: string;
    ownerNumber?: string;
    tradeDimensionNumber?: string;
    size?: string;
    remark?: string;
    verified?: boolean;
    clientName?: string;
    clientNumber?: string;
    addresses?: Array<AddressResponse>;
    areaAssignments?: Array<AreaResponse>;
    chainAssignments?: Array<ChainResponse>;
}