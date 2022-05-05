export class Personal {
    idPersonal: number;
    nroDi: string;
    nombrePer: string;
    genero: string;
    direccion: string;
    telefono: number;
    especialidad: string;
    fechaRegistro: Date;
    nombres:string;
    apellidoPaterno:string;
    apellidoMaterno:string
    constructor(){
        this.idPersonal = 0;
        this.nroDi = '';
        this.nombrePer = '';
        this.direccion = '';
        this.genero = '';
        this.telefono = 0;
        this.especialidad = '';
        this.fechaRegistro = null;
        this.nombres = '';
        this.apellidoPaterno = '';
        this.apellidoMaterno = '';
    }
}
