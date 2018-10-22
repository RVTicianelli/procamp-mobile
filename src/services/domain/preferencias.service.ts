import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PreferenciasDTO } from "../../models/preferencias.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class PreferenciasService {
    prefList : PreferenciasDTO[];
    constructor(public http: HttpClient) {
        
    }

    findAll() : Observable<PreferenciasDTO[]> {
        return this.http.get<PreferenciasDTO[]>(`${API_CONFIG.baseUrl}/preferencia/buscapreferencia`);
    }
}