import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';
@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
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
      nombres:[''],
      apellidoPaterno:[''],
      apellidoMaterno:[''],
      direccion:[''],
      telefono:[''],
      ubigeo:[''],
      fechaIngreso:[''],
    });
  }
  obtenerDatos(){
    let param = [
      {clave:'nombres', valor: this.fbFormulario.get('nombres').value},
      {clave:'apellidoPaterno', valor: this.fbFormulario.get('apellidoPaterno').value},
      {clave:'apellidoMaterno', valor: this.fbFormulario.get('apellidoMaterno').value},
      {clave:'direccion', valor: this.fbFormulario.get('direccion').value},
      {clave:'telefono', valor: this.fbFormulario.get('telefono').value},
      {clave:'ubigeo', valor: this.fbFormulario.get('ubigeo').value},
      {clave:'fechaIngreso', valor: this.fbFormulario.get('fechaIngreso').value},
    ]
    this.appService.getParam('alumno',param).subscribe((res:any)=> {
      this.dataSource = res;
    })
  }
  selectItem(item:any){
     this.router.navigate(["/alumno", item.idAlumno]);
  }
  nuevo(){
     this.router.navigate(["/alumno", 0]);
  }
}
