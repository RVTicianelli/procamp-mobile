import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { UsuarioDTO } from "../../models/usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email: string) : Observable<UsuarioDTO> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})

        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuario/buscausuario/email/${email}`, {'headers': authHeader});
    }
}