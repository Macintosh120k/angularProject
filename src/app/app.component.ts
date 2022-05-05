import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crudPhpAngular';
  constructor(private router: Router) {}
  selectItem(item: any) {
    this.router.navigate(['/' + item]);
    document.getElementById('dropMenuBtn').classList.remove('show')
    document.getElementById('dropMenuBtn2').classList.remove('show')
  }
  abrirDrop(){
    document.getElementById('dropMenuBtn').classList.add('show')
    document.getElementById('dropMenuBtn2').classList.add('show')
  }
  cerrarDrop(){
    document.getElementById('dropMenuBtn').classList.remove('show')
    document.getElementById('dropMenuBtn2').classList.remove('show')
  }
}
