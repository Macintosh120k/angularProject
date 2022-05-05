import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionListComponent } from './seccion-list.component';

describe('SeccionListComponent', () => {
  let component: SeccionListComponent;
  let fixture: ComponentFixture<SeccionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
