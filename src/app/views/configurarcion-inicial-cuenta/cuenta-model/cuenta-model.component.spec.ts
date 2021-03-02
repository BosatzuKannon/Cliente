import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaModelComponent } from './cuenta-model.component';

describe('CuentaModelComponent', () => {
  let component: CuentaModelComponent;
  let fixture: ComponentFixture<CuentaModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
