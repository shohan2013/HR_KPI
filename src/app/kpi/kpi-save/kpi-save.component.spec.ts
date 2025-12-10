import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSaveComponent } from './kpi-save.component';

describe('KpiSaveComponent', () => {
  let component: KpiSaveComponent;
  let fixture: ComponentFixture<KpiSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpiSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
