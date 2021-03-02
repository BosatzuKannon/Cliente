import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuentaComponent } from './registro-cuenta.component';

describe('RegistroCuentaComponent', () => {
  let component: RegistroCuentaComponent;
  let fixture: ComponentFixture<RegistroCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
