import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoListComponent } from './components/alumno/alumno-list/alumno-list.component';
import { AlumnoComponent } from './components/alumno/alumno/alumno.component';
import { VistaGaleriaComponent } from './components/galeria/vista-galeria/vista-galeria.component';
import { PersonalListComponent } from './components/personal/personal-list/personal-list.component';
import { PersonalComponent } from './components/personal/personal/personal.component';
import { SeccionListComponent } from './components/seccion/seccion-list/seccion-list.component';
import { SeccionComponent } from './components/seccion/seccion/seccion.component';


const routes: Routes = [
  { path: "", component: SeccionListComponent },
  { path: "seccionList", component: SeccionListComponent },
  { path: "seccion/:idSeccion", component: SeccionComponent },
  { path: "alumnoList", component: AlumnoListComponent },
  { path: "alumno/:idAlumno", component: AlumnoComponent },
  { path: "personalList", component: PersonalListComponent },
  { path: "personal/:idPersonal", component: PersonalComponent },
  { path: "vistaGaleria", component: VistaGaleriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
