import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seccion } from '../../models/seccion';
import { AppServiceService } from '../../services/app-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css'],
})
export class SeccionComponent implements OnInit {
  fbFormulario: FormGroup;
  seccionesList: any[] = [];
  insertForm: Seccion = new Seccion();
  idForm: any = 0;
  estadoForm: any;
  constructor(
    private appService: AppServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.idForm = this.route.snapshot.params['idSeccion'];
    if (Number(this.idForm) == 0) {
      this.estadoForm = 'nuevo';
    } else {
      this.estadoForm = 'ver';
      this.obtenerDatos();
    }
  }
  buildForm() {
    this.fbFormulario = this.fb.group({
      nombreSeccion: [''],
    });
  }
  obtenerDatos() {
    this.appService.getID('secciones',this.idForm).subscribe((res: any) => {
      const item = res[0];
      this.fbFormulario.get('nombreSeccion').setValue(item.nombreSeccion);
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  colectData() {
    this.insertForm.idSeccion = this.idForm;
    this.insertForm.nombreSeccion = this.fbFormulario.get('nombreSeccion').value;
  }
  guardar() {
    this.colectData();
    this.appService.create('secciones',this.insertForm).subscribe((res: any) => {
      this.cerrar();
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  editar() {
    this.colectData();
    this.appService.update('secciones',this.insertForm).subscribe((res: any) => {
      this.cerrar();
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  eliminar() {
    if (confirm('Confirmar para eliminar este Registro...')) {
      this.appService.delete('secciones',this.idForm).subscribe(
        (res: any) => {
          console.log(res);
          this.cerrar();
        },
        (error: any) => {
          alert('Error!\n' + error.message);
        }
      );
    }
  }
  cerrar() {
    this.router.navigate(['/seccionList']);
  }
  alertas(type, text, icon) {
    Swal.fire({
      title: type,
      text: text,
      icon: icon,
    });
  }
}
