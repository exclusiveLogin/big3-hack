import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttempTableComponent } from './attemp-table.component';

describe('AttempTableComponent', () => {
  let component: AttempTableComponent;
  let fixture: ComponentFixture<AttempTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttempTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttempTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
