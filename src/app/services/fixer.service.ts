import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FixerService {

  constructor(private http: HttpClient) { }

  symbols$ () {
    return this.http.post( '/api/fixer/symbols', {});
  }

  latest$ (base?: string, symbols?: string) {
    return this.http.post( '/api/fixer/latest', {
      base: base,
      symbols: symbols
    });
  }

}
