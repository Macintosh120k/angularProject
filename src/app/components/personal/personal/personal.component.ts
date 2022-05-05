import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';
import Swal from 'sweetalert2'
import { ObservService } from '../../services/observ.service';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  fbFormulario: FormGroup;
  seccionesList: any[] = [];
  insertForm: Personal = new Personal();
  idForm: any = 0;
  estadoForm: any;
  //IMAGEN
  nombreArchivo: any = "Seleccione un Archivo";
  image: File = null;
  imagenItem: any = "";
  conImagen: boolean = false;
  //
  btnSearchSunat:boolean = true
  constructor(
    private appService: AppServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private observService: ObservService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.idForm = this.route.snapshot.params['idPersonal'];
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
      idPersonal:[''],
      nroDi:[''],
      nombrePer:[''],
      nombres:[''],
      apellidoPaterno:[''],
      apellidoMaterno:[''],
      genero:[''],
      telefono:[''],
      direccion:[''],
      especialidad:[''],
      fechaRegistro:[''],
    });
  }
  obtenerDatos() {
    this.appService.getID('personal', this.idForm).subscribe((res: any) => {
      const item = res[0];
      this.fbFormulario.get('idPersonal').setValue(item.idPersonal)
      this.fbFormulario.get('nroDi').setValue(item.nroDi)
      if(String(item.nombrePer).length > 0){
        this.btnSearchSunat = false
      }else{
        this.btnSearchSunat = true
      }
      this.fbFormulario.get('nombrePer').setValue(item.nombrePer)
      let nombres = item.nombrePer.split(',')
      let apellidos = nombres[0].split('/')
      this.fbFormulario.get('nombres').setValue(nombres[1])
      this.fbFormulario.get('apellidoPaterno').setValue(apellidos[0])
      this.fbFormulario.get('apellidoMaterno').setValue(apellidos[1])
      this.fbFormulario.get('direccion').setValue(item.direccion)
      this.fbFormulario.get('genero').setValue(item.genero)
      this.fbFormulario.get('telefono').setValue(item.telefono)
      this.fbFormulario.get('especialidad').setValue(item.especialidad)
      this.fbFormulario.get('fechaRegistro').setValue(item.fechaRegistro)
      this.imagenItem = item.img;
    });
  }
  colectData() {
    let nombrePer = this.fbFormulario.get('apellidoPaterno').value + '/' + this.fbFormulario.get('apellidoMaterno').value + ',' + this.fbFormulario.get('nombres').value
    this.insertForm.idPersonal = Number(this.idForm);
    this.insertForm.nroDi = this.fbFormulario.get('nroDi').value;
    this.insertForm.nombrePer = nombrePer == '/,' ? '' : nombrePer.toUpperCase();
    this.insertForm.genero = this.fbFormulario.get('genero').value;
    this.insertForm.direccion = this.fbFormulario.get('direccion').value;
    this.insertForm.telefono = Number(this.fbFormulario.get('telefono').value) == 0 ? null : Number(this.fbFormulario.get('telefono').value);
    this.insertForm.especialidad = this.fbFormulario.get('especialidad').value;
    this.insertForm.fechaRegistro = this.fbFormulario.get('fechaRegistro').value;
    this.insertForm.nombres = this.fbFormulario.get('nombres').value;
    this.insertForm.apellidoPaterno = this.fbFormulario.get('apellidoPaterno').value;
    this.insertForm.apellidoMaterno = this.fbFormulario.get('apellidoMaterno').value;
    // console.log(JSON.stringify(this.insertForm))
  }
  guardar() {
    this.colectData();
    const formData = new FormData();
    formData.append("dataForm", JSON.stringify(this.insertForm));
    if (this.image != null) {
      formData.append("file", <File>this.image, this.image.name);
    }
    this.appService.create('personal', formData).subscribe((res: any) => {
      this.alertas('Exito!', res, 'success');
      this.cerrar();
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  editar() {
    this.colectData();
    this.appService.update('personal', this.insertForm).subscribe((res: any) => {
      this.alertas('Exito!', res, 'success');
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
    });
  }
  eliminar() {
    if (confirm('Confirmar para eliminar este Registro...')) {
      this.appService.delete('personal', this.idForm).subscribe(
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
    this.router.navigate(['/personalList']);
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
    
    // if(this.idForm > 0){
    //   const formData = new FormData();
    //   formData.append("id", this.idForm);
    //   if (this.image != null) {
    //     formData.append("file", <File>this.image, this.image.name);
    //   }
    //   this.appService.updateImage('updateImg', formData).subscribe((res: any) => {
    //     this.alertas('Exito!', res, 'success');
    //   },
    //   (error: any) => {
    //     this.alertas('Error!', JSON.stringify(error.error), 'error');
    //     this.observService.spinner$.emit(false);
    //   });
    // }
  }
  alertas(type, text, icon) {
    Swal.fire({
      title: type,
      text: text,
      icon: icon,
    });
  }
  buscarPorSunat(){
    this.observService.spinner$.emit(true);
    this.appService.getSuntatReniec(this.fbFormulario.get('nroDi').value).subscribe((res: any) => {
      if(res.dni != undefined){
        this.fbFormulario.get('nombres').setValue(res.nombres)
        this.fbFormulario.get('apellidoPaterno').setValue(res.apellidoPaterno)
        this.fbFormulario.get('apellidoMaterno').setValue(res.apellidoMaterno)
        this.fbFormulario.get('nroDi').disable();
        this.fbFormulario.get('nombres').disable();
        this.fbFormulario.get('apellidoPaterno').disable();
        this.fbFormulario.get('apellidoMaterno').disable();
        this.btnSearchSunat = false;
      }else{
        this.alertas('Aviso!', 'No se econtraron datos, Registre manualmente', 'info');
      }
      this.observService.spinner$.emit(false);
    },
    (error: any) => {
      this.alertas('Error!', JSON.stringify(error.error), 'error');
      this.observService.spinner$.emit(false);
    });
  }
  nuevaBusquedaSunat(){
    this.fbFormulario.get('nroDi').setValue('')
    this.fbFormulario.get('nombres').setValue('')
    this.fbFormulario.get('apellidoPaterno').setValue('')
    this.fbFormulario.get('apellidoMaterno').setValue('')
    this.fbFormulario.get('nombres').enable();
    this.fbFormulario.get('nroDi').enable();
    this.fbFormulario.get('apellidoPaterno').enable();
    this.fbFormulario.get('apellidoMaterno').enable();
    this.btnSearchSunat = true;
  }
}
