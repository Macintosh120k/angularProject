import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-vista-galeria',
  templateUrl: './vista-galeria.component.html',
  styleUrls: ['./vista-galeria.component.css']
})
export class VistaGaleriaComponent implements OnInit {

  constructor(
    private appService: AppServiceService,
    private fb: FormBuilder,
    private router: Router,
  ) { 
    
  }
  dataSource:any[]=[]
  ngOnInit(): void {
    this.obtenerDatos();
  }
  obtenerDatos(){
    this.appService.getImagenes().subscribe((res:any)=> {
      console.log(res)
      this.dataSource = res
    })
  }
}
