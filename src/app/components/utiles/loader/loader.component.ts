import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObservService } from '../../services/observ.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  spinner: Subscription;
  showSpinner: boolean = false;
  constructor(
    private observService: ObservService
  ) {
    this.spinner = this.observService.spinner$.subscribe((obj: any) => {
      this.showSpinner = obj;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.spinner.unsubscribe();
  }
}
