import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeccionListComponent } from './components/seccion/seccion-list/seccion-list.component';
import { SeccionComponent } from './components/seccion/seccion/seccion.component';
import { AlumnoListComponent } from './components/alumno/alumno-list/alumno-list.component';
import { AlumnoComponent } from './components/alumno/alumno/alumno.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoaderComponent } from './components/utiles/loader/loader.component';
import { PersonalListComponent } from './components/personal/personal-list/personal-list.component';
import { PersonalComponent } from './components/personal/personal/personal.component';
@NgModule({
  declarations: [
    AppComponent,
    SeccionListComponent,
    SeccionComponent,
    AlumnoListComponent,
    AlumnoComponent,
    LoaderComponent,
    PersonalListComponent,
    PersonalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
