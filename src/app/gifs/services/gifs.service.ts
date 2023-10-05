import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Gift, SearchGiftResponse } from '../interfaces/giftInterface';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'mJVQ4CjvYkwELwBABwC3Wk7KfNA8IDWU'
  public resultados: Gift[] = [];
  private urlService: string = 'https://api.giphy.com/v1/gifs/search';

  get historial() { return [...this._historial]; }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }



  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      // El query está vacío o ya existe
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      // localStorage.setItem('historial',query);
      localStorage.setItem('historial', JSON.stringify(this._historial))

    }
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',query)
    .set('limit',10);
    
    // this.http.get('https://api.giphy.com/v1/gifs/search?api_key=mJVQ4CjvYkwELwBABwC3Wk7KfNA8IDWU&q=' + query + '&limit=10')
    //   .subscribe((responseHttp: any) => {
    //     this.resultados = responseHttp.data;
    //     console.log(responseHttp.data);
    //   })

    this.http.get<SearchGiftResponse>(`${this.urlService}`,{params})
      .subscribe((responseHttp) => {
        this.resultados = responseHttp.data;
        console.log(responseHttp.data);
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })

    // console.log(this._historial);
  }
}




