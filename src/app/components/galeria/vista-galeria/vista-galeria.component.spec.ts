import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGaleriaComponent } from './vista-galeria.component';

describe('VistaGaleriaComponent', () => {
  let component: VistaGaleriaComponent;
  let fixture: ComponentFixture<VistaGaleriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaGaleriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
