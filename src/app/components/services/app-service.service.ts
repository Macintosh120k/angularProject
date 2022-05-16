import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seccion } from '../models/seccion';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}
  getParam(api,params:any){
    // console.log(params)
    if(params.length > 0){
      let str = '?'
      params.forEach(x => {
        if(x.valor.length > 0 ){
          str +=  x.clave + '=' + x.valor + '&'
        }
      })
      return this.http.get(<any>'http://localhost/angularPhp/Server/controladores/' + api + '.php' + str);
    }else{
      return this.http.get(<any>'http://localhost/angularPhp/Server/controladores/' + api + '.php');
    }
  }
  getID(api,id:any){
    return this.http.get(<any>'http://localhost/angularPhp/Server/controladores/'+ api + '.php?id=' + id);
  }
  getSuntatReniec(nroDi:string){
    let url = ''
    if(nroDi.length == 8){
      url = environment.urlDni + nroDi + environment.tokenDni;
    }else{
      url = environment.urlRuc + nroDi + environment.tokenRuc;
    }
    return this.http.get(url);
  }
  create(api,formData:any){
    return this.http.post('http://localhost/angularPhp/Server/controladores/'+ api +'.php',formData);
  }
  update(api,formData:any){
    return this.http.put('http://localhost/angularPhp/Server/controladores/'+ api +'.php',formData);
  }
  delete(api,id:any){
    return this.http.delete('http://localhost/angularPhp/Server/controladores/'+ api + '.php?id=' + id);
  }
  updateImage(api,formData:any){
    return this.http.post('http://localhost/angularPhp/Server/controladores/'+ api +'.php',formData);
  }
  getImagenes(){
    return this.http.get(<any>'http://localhost/angularPhp/Server/controladores/galeria.php');
  }
}
