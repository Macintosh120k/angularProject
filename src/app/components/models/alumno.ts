export class Alumno {
    idAlumno:number;
    nombres:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    direccion:string;
    telefono:string;
    ubigeo:string;
    fechaIngreso:Date;
    constructor(){
        this.idAlumno = 0;
        this.nombres = '';
        this.apellidoPaterno = '';
        this.apellidoMaterno = '';
        this.direccion = '';
        this.telefono = '';
        this.ubigeo = '';
        this.fechaIngreso = null;
    }
}
