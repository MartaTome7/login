import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecursoReuniao } from './recursoreuniao';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class HttpRecursosReuniaoService {
  private urlGetAll = environment.apiUrl + '/api/RecursosReunioes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.urlGetAll);
  }

  getByReuniaoID(reuniaoID: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByReuniaoID/' + reuniaoID);
  }

  getByRecursoID(recursoID: number): Observable<any> {
    return this.http.get(this.urlGetAll + '/GetByRecursoID/' + recursoID);
  }

  delete(recursoReuniaoID: number) {
    return this.http.delete(this.urlGetAll + '/' + recursoReuniaoID);
  }

  post(recursosReuniao: RecursoReuniao[]) {
    return this.http.post(this.urlGetAll, recursosReuniao);
  }
}
