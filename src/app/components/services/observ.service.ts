import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservService {
  spinner$ = new EventEmitter<boolean>();
  constructor() { }
}
