import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recurso } from './recurso';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRecursosService {
  private urlGetAll = environment.apiUrl + '/api/Recursos';

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(this.urlGetAll, {
      params: new HttpParams()
        .set('PageNumber', pageNumber.toString())
        .set('PageSize', pageSize.toString()),
    });
  }

  getByNome(nome: string): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByNome/' + nome);
  }

  getByRecursoID(recursoID: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByRecursoID/' + recursoID);
  }

  getByRecursoObrigatorioID(recursoID: number): Observable<any> {
    console.log(this.urlGetAll + '/GetByRecursoObrigatorioID/' + recursoID);
    return this.http.get(
      this.urlGetAll + '/GetByRecursoObrigatorioID/' + recursoID
    );
  }

  getByDates(dataInicio: string, dataFim: string): Observable<any> {
    return this.http.get(
      this.urlGetAll + '/GetByDates/' + dataInicio + '&' + dataFim
    );
  }

  delete(recursoID: number) {
    return this.http.delete<Recurso>(this.urlGetAll + '/' + recursoID);
  }

  post(recurso: Recurso) {
    return this.http.post<Recurso>(this.urlGetAll, recurso);
  }

  putNome(recursos: Recurso[]) {
    return this.http.put(this.urlGetAll + '/' + 1, recursos);
  }

  putQuantidadeTotal(recursos: Recurso[]) {
    return this.http.put(this.urlGetAll + '/' + 2, recursos);
  }

  putRecursoObrigatorio(recursos: Recurso[]) {
    return this.http.put(this.urlGetAll + '/' + 3, recursos);
  }
}
