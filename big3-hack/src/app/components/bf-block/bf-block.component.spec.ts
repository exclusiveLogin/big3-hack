import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfBlockComponent } from './bf-block.component';

describe('BfBlockComponent', () => {
  let component: BfBlockComponent;
  let fixture: ComponentFixture<BfBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
