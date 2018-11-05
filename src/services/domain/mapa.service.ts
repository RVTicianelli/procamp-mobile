import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { MapaReq } from "../../models/mapaReq";
import { GeoResponse } from "../../models/georesponse";

@Injectable()
export class MapaService {

    constructor(public http: HttpClient) {
        
    }

    geraMapa(listaEnderecos: MapaReq) : Observable<GeoResponse[]> {
        return this.http.post<GeoResponse[]>(
            `${API_CONFIG.baseUrl}/localidade/gerapontos`,
            listaEnderecos
        )
    }
}
