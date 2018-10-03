import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CampanhaDTO } from "../../models/campanha";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CampanhaService {
    constructor(public http: HttpClient) {
        
    }

    findAll() : Observable<CampanhaDTO[]> {
        return this.http.get<CampanhaDTO[]>(`${API_CONFIG.baseUrl}/campanha/buscacampanha`);
    }
}