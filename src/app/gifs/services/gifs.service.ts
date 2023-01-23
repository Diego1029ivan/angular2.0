import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string='Yixz4Xnm8FAIurA65l0e921QD0mMugcb'
  private servicioUrl: string ='http://api.giphy.com/v1/gifs'
  private _historial:string[] = []

  //TODOS: cambi any por su tipo que corresponde
  public resultados :Gif[]=[]; 

  get historial(){
    
    return [...this._historial]
  }

  constructor(private http:HttpClient){
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }

   buscarGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();//cortar espacios y exponer en lowerCase

    if(!this._historial.includes(query)){//evitar si se repite
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);//cortar en los ultimos 10
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query);

      //console.log(params.toString())
/* retornar observables !!! */
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp)=>{
        
        this.resultados = resp.data
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
        
      })

    // const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=Yixz4Xnm8FAIurA65l0e921QD0mMugcb&q=dragon ball z&limit=10')
    // const data = await resp.json();
    // console.log(data)
    //console.log(this._historial)
  }
}
