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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { DataLockedCreationRequest } from '../model/dataLockedCreationRequest';
import { DataLockedResponse } from '../model/dataLockedResponse';
import { ProblemDetails } from '../model/problemDetails';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DataLockedService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Deletes all DataLocked-Records for an entity which indicates that the entity is no longer locked by a user
     * Deletes all DataLocked-Records for an entity which indicates that the entity is no longer locked by a user
     * @param entityId The id of the entity to be unlocked
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dataLockedEntityIdDelete(entityId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public dataLockedEntityIdDelete(entityId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public dataLockedEntityIdDelete(entityId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public dataLockedEntityIdDelete(entityId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (entityId === null || entityId === undefined) {
            throw new Error('Required parameter entityId was null or undefined when calling dataLockedEntityIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/DataLocked/${encodeURIComponent(String(entityId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns a DataLocked-Response if the given entityId is locked by a user
     * Returns a DataLocked-Response if the given entityId is locked by a user
     * @param entityId The id of the entity that is locked
     * @param expand Returns also related entities if set to &#x27;true&#x27;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dataLockedEntityIdGet(entityId: string, expand?: boolean, observe?: 'body', reportProgress?: boolean): Observable<DataLockedResponse>;
    public dataLockedEntityIdGet(entityId: string, expand?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DataLockedResponse>>;
    public dataLockedEntityIdGet(entityId: string, expand?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DataLockedResponse>>;
    public dataLockedEntityIdGet(entityId: string, expand?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (entityId === null || entityId === undefined) {
            throw new Error('Required parameter entityId was null or undefined when calling dataLockedEntityIdGet.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (expand !== undefined && expand !== null) {
            queryParameters = queryParameters.set('expand', <any>expand);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DataLockedResponse>('get',`${this.basePath}/DataLocked/${encodeURIComponent(String(entityId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a new DataLocked-Record which indicates that the entity is locked by a user
     * Creates a new DataLocked-Record which indicates that the entity is locked by a user
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dataLockedPost(body?: DataLockedCreationRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public dataLockedPost(body?: DataLockedCreationRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public dataLockedPost(body?: DataLockedCreationRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public dataLockedPost(body?: DataLockedCreationRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/DataLocked`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}