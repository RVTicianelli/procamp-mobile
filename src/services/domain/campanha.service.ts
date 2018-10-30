import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CampanhaDTO } from "../../models/campanha";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CampanhaService {

    camps: CampanhaDTO[] = [];

    constructor(public http: HttpClient) {
        
    }

    findAll() : Observable<CampanhaDTO[]> {
        return this.http.get<CampanhaDTO[]>(`${API_CONFIG.baseUrl}/campanha/buscacampanha`);
    }

    findById(campanhaId) : Observable<CampanhaDTO> {
        return this.http.get<CampanhaDTO>(`${API_CONFIG.baseUrl}/campanha/buscacampanha/${campanhaId}`);
    }

    findByPref(pref) : Observable<CampanhaDTO[]> {
        return this.http.get<CampanhaDTO[]>(`${API_CONFIG.baseUrl}/campanha/buscacampanha/preferencias/${pref}`);
    }

    findByTypeAndDate(tpCamp, date) : Observable<CampanhaDTO[]> {
        return this.http.get<CampanhaDTO[]>(`${API_CONFIG.baseUrl}/campanha/buscacampanha/novas/tipocampanha/${tpCamp}/${date}`);
    }
}