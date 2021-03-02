import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloWebCamComponent } from './modelo-web-cam.component';

describe('ModeloWebCamComponent', () => {
  let component: ModeloWebCamComponent;
  let fixture: ComponentFixture<ModeloWebCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloWebCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloWebCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
