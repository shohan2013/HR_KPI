import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiApprovalComponent } from './kpi-approval.component';

describe('KpiApprovalComponent', () => {
  let component: KpiApprovalComponent;
  let fixture: ComponentFixture<KpiApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpiApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
