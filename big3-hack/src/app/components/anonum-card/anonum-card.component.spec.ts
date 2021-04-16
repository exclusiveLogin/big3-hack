import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonumCardComponent } from './anonum-card.component';

describe('AnonumCardComponent', () => {
  let component: AnonumCardComponent;
  let fixture: ComponentFixture<AnonumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonumCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
