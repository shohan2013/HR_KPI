import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaloutionDialogComponent } from './evaloution-dialog.component';

describe('EvaloutionDialogComponent', () => {
  let component: EvaloutionDialogComponent;
  let fixture: ComponentFixture<EvaloutionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaloutionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaloutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
