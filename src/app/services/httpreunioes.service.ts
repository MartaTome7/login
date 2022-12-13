import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reuniao } from './reuniao';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpReunioesService {
  private urlGetAll = environment.apiUrl + '/api/Reunioes';

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(this.urlGetAll, {
      params: new HttpParams()
        .set('PageNumber', pageNumber.toString())
        .set('PageSize', pageSize.toString()),
    });
  }

  getByReuniaoID(reuniaoID: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByReuniaoID/' + reuniaoID);
  }

  getBySalaID(salaID: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetBySalaID/' + salaID);
  }

  getByDate(dataSeleccionada: string): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByDate/' + dataSeleccionada);
  }

  getByNumeroAndDate(
    numeroSala: number,
    dataSeleccionada: string
  ): Observable<any> {
    return this.http.get(
      this.urlGetAll +
        '/GetByNumeroAndDate/' +
        numeroSala +
        '&' +
        dataSeleccionada
    );
  }

  delete(reuniaoID: number) {
    return this.http.delete(this.urlGetAll + '/' + reuniaoID);
  }

  post(reuniao: Reuniao) {
    return this.http.post<Reuniao>(this.urlGetAll, reuniao);
  }
}
