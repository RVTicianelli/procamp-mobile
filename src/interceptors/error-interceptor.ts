import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if(!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("erro");
            console.log(errorObj.status);

            switch(errorObj.status) {
                case 401:
                    console.log('entrou no case?');
                    this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertController.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        })
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};