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
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuario/buscausuario/email/${email}`);
    }

    insert(obj: UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuario/insere`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    updateUser(id, obj: UsuarioDTO) {
        console.log(obj);
        return this.http.put(
            `${API_CONFIG.baseUrl}/usuario/update/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }            
        );
    }

    removeUser(id) {
        console.log('entrou p apagar');
        return this.http.delete(
            `${API_CONFIG.baseUrl}/usuario/delete/${id}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}