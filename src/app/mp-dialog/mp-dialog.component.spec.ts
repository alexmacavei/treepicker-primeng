import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpDialogComponent } from './mp-dialog.component';

describe('MpDialogComponent', () => {
  let component: MpDialogComponent;
  let fixture: ComponentFixture<MpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
