import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {
  fbFormulario: FormGroup;
  dataSource:any[]=[]
  constructor(
    private appService: AppServiceService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerDatos();
  }
  buildForm(){
    this.fbFormulario = this.fb.group({
      nroDi:[''],
      nombres:[''],
      apellidoPaterno:[''],
      apellidoMaterno:[''],
    });
  }
  obtenerDatos(){
    let param = [
      {clave:'nroDi', valor: this.fbFormulario.get('nroDi').value},
      {clave:'nombres',valor: this.fbFormulario.get('nombres').value},
      {clave:'apellidoPaterno',valor: this.fbFormulario.get('apellidoPaterno').value},
      {clave:'apellidoMaterno',valor: this.fbFormulario.get('apellidoMaterno').value},
    ]
    this.appService.getParam('personal',param).subscribe((res:any)=> {
      this.dataSource = res;
    })
  }
  selectItem(item:any){
     this.router.navigate(["/personal", item.idPersonal]);
  }
  nuevo(){
     this.router.navigate(["/personal", 0]);
  }
}
