import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from './models/contato';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8090/api/contacts'; 

  constructor(private http: HttpClient) {}

  salvarContato(contato: Contato): Observable<any> { 
    return this.http.post(this.apiUrl, contato);
  }

  deleteContact(parametroDelecao: { nome?: string; email?: string }): Observable<void> {
    const url = `${this.apiUrl}/nome/email`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: parametroDelecao,
    };
  
    return this.http.delete<void>(url, options);
  }


  getContactsByName(nome: string): Observable<Contato[]> {
    const url = `${this.apiUrl}/${nome}`;
    return this.http.get<Contato[]>(url);
  }
}
