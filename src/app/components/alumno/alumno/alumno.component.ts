import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../models/alumno';
import { AppServiceService } from '../../services/app-service.service';
import Swal from 'sweetalert2'
import { ObservService } from '../../services/observ.service';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
})
export class AlumnoComponent implements OnInit {
  fbFormulario: FormGroup;
  seccionesList: any[] = [];
  insertForm: Alumno = new Alumno();
  idForm: any = 0;
  estadoForm: any;
    //IMAGEN
    nombreArchivo: any = "Seleccione un Archivo";
    image: File = null;
    imagenItem: any = "";
    conImagen: boolean = false;
    //
  constructor(
    private appService: AppServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private observService: ObservService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.idForm = this.route.snapshot.params['idAlumno'];
    if (Number(this.idForm) == 0) {
      this.estadoForm = 'nuevo';
    } else {
      this.estadoForm = 'ver';
      this.obtenerDatos();
    }   
    // this.observService.spinner$.emit(true);
    // this.buscarPorSunat();
  }
  buildForm() {
    this.fbFormulario = this.fb.group({
      nombres: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      direccion: [''],
      telefono: [''],
      ubigeo: [''],
      fechaIngreso: [''],
      img: [''],
    });
  }
  obtenerDatos() {
    this.appService.getID('alumno', this.idForm).subscribe((res: any) => {
      const item = res[0];
      this.fbFormulario.get('nombres').setValue(item.nombres);
      this.fbFormulario.get('apellidoPaterno').setValue(item.apellidoPaterno);
      this.fbFormulario.get('apellidoMaterno').setValue(item.apellidoMaterno);
      this.fbFormulario.get('direccion').setValue(item.direccion);
      this.fbFormulario.get('telefono').setValue(item.telefono);
      this.fbFormulario.get('ubigeo').setValue(item.ubigeo);
      this.fbFormulario.get('fechaIngreso').setValue(item.fechaIngreso);
      this.imagenItem = item.img;
    });
  }
  colectData() {
    this.insertForm.idAlumno = this.idForm;
    this.insertForm.nombres = this.fbFormulario.get('nombres').value;
    this.insertForm.apellidoPaterno =
      this.fbFormulario.get('apellidoPaterno').value;
    this.insertForm.apellidoMaterno =
      this.fbFormulario.get('apellidoMaterno').value;
    this.insertForm.direccion = this.fbFormulario.get('direccion').value;
    this.insertForm.telefono = this.fbFormulario.get('telefono').value;
    this.insertForm.ubigeo = this.fbFormulario.get('ubigeo').value;
    this.insertForm.fechaIngreso = this.fbFormulario.get('fechaIngreso').value;
  }
  guardar() {
    this.colectData();
    const formData = new FormData();
    formData.append("dataForm", JSON.stringify(this.insertForm));
    if (this.image != null) {
      formData.append("file", <File>this.image, this.image.name);
    }
    this.appService.create('alumno', formData).subscribe((res: any) => {
      this.alertas('Exito!', res, 'success');
      this.cerrar();
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  editar() {
    this.colectData();
    this.appService.update('alumno', this.insertForm).subscribe((res: any) => {
      this.alertas('Exito!', res, 'success');
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  eliminar() {
    if (confirm('Confirmar para eliminar este Registro...')) {
      this.appService.delete('alumno', this.idForm).subscribe(
        (res: any) => {
          this.alertas('Exito!', res, 'success');
          this.cerrar();
        },
        (error: any) => {
          alert('Error!\n' + error.message);
        }
      );
    }
  }
  cerrar() {
    this.router.navigate(['/alumnoList']);
  }
  onFileChange(e: any) {
    this.image = <File>e.target.files[0];
    this.nombreArchivo = this.image.name;
    // if (this.image.type != 'image/jpeg') {
    //   this.alertas('Archivo no permitido', 'Solo se permiten imagenes .JPG', 'error', 'btn');
    //   return;
    // }
    if (this.image.size >= 5024000) {
      this.alertas(
        "Imagen demasiado grande",
        "Tamaño de imagen permitido hasta 1MB",
        "error",
      );
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = (_event) => {
      this.imagenItem = reader.result;
      this.conImagen = true;
    };
    
    if(this.idForm > 0){
      const formData = new FormData();
      formData.append("id", this.idForm);
      if (this.image != null) {
        formData.append("file", <File>this.image, this.image.name);
      }
      this.appService.updateImage('updateImg', formData).subscribe((res: any) => {
        this.alertas('Exito!', res, 'success');
      },
      (error: any) => {
        this.alertas('Error!', JSON.stringify(error.error), 'error');
      });
    }
  }
  alertas(type, text, icon) {
    Swal.fire({
      title: type,
      text: text,
      icon: icon,
    });
  }
  buscarPorSunat(){
    let dni = '10766308622'
    this.appService.getSuntatReniec(dni).subscribe((res: any) => {
      // this.observService.spinner$.emit(false);
    });
  }
}
