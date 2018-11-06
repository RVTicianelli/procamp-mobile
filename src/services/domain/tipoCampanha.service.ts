import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TipoCampanha } from "../../models/tipoCampanha";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class TipoCampanhaService {
    constructor(public http: HttpClient) {
        
    }

    findAll(): Observable<TipoCampanha[]> {
        return this.http.get<TipoCampanha[]>(`${API_CONFIG.baseUrl}/tipocampanha/buscatipocampanha`);
    }
}