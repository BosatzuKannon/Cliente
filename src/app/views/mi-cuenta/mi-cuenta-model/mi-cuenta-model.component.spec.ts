import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaModelComponent } from './mi-cuenta-model.component';

describe('MiCuentaModelComponent', () => {
  let component: MiCuentaModelComponent;
  let fixture: ComponentFixture<MiCuentaModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiCuentaModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCuentaModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
