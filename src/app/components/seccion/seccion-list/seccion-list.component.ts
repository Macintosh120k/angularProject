import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-seccion-list',
  templateUrl: './seccion-list.component.html',
  styleUrls: ['./seccion-list.component.css']
})
export class SeccionListComponent implements OnInit {
  fbFormulario: FormGroup;
  seccionesList:any[]=[]
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
      idSeccion:[''],
      nombreSeccion:['']
    });
  }
  obtenerDatos(){
    let param = [
      { clave: 'idSeccion',valor: this.fbFormulario.get('idSeccion').value},
      { clave: 'nombreSeccion',valor: this.fbFormulario.get('nombreSeccion').value}
    ]
    this.appService.getParam('secciones',param).subscribe((res:any)=> {
      this.seccionesList = res;
    })
  }
  selectItem(item:any){
     this.router.navigate(["/seccion", item.idSeccion]);
  }
  nuevaSeccion(){
     this.router.navigate(["/seccion", 0]);
  }
}
