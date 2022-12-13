import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Sala } from './sala';

@Injectable()
export class HttpSalasService {
  private urlGetAll = environment.apiUrl + '/api/Salas';

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(this.urlGetAll, {
      params: new HttpParams()
        .set('PageNumber', pageNumber.toString())
        .set('PageSize', pageSize.toString()),
    });
  }

  getLikeNumero(numero: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetLikeNumero/' + numero);
  }

  getByNumero(numero: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByNumero/' + numero);
  }

  delete(salaID: number): Observable<any> {
    return this.http.delete<Sala>(this.urlGetAll + '/' + salaID);
  }

  post(sala: Sala): Observable<any> {
    return this.http.post<Sala>(this.urlGetAll, sala);
  }

  put(salaID: number, sala: Sala): Observable<any> {
    return this.http.put<Sala>(this.urlGetAll + '/' + salaID, sala);
  }
}
