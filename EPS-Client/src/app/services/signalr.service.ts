import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppointmentResponse } from '../modules/api';
import { AuthenticationHandlerService } from '../modules/auth/services/authenticationhandler.service';

@Injectable()
export class SignalRService {

    private hubConnection: HubConnection;
    onAppointmentChanged: Subject<AppointmentResponse> = new Subject<AppointmentResponse>();

    constructor(private authService: AuthenticationHandlerService) {
        this.createConnection();
    }

    private createConnection() {

        console.log("Create SignalR connection to: " + environment.broadcastHubUrl);
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.broadcastHubUrl, { accessTokenFactory: () => this.authService.getCachedToken() })
            //TODO: Benutzer benachrichtigen wenn Verbindung dauerhaft verloren
            .withAutomaticReconnect([0, 2000, 10000, 30000, 60000, 120000])
            .build();

        this.registerOnServerEvents();
        this.startConnection();
    }

    private registerOnServerEvents(): void {
        this.hubConnection.on('AppointmentChanged', (data: AppointmentResponse) => {
            this.onAppointmentChanged.next(data);
        });
        this.hubConnection.on('Echo', (data: any) => {
            console.log(data)
        });
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                console.log(err);
            });
    }
}
