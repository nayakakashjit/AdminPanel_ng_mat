import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaLoanComponent } from './insta-loan.component';

describe('InstaLoanComponent', () => {
  let component: InstaLoanComponent;
  let fixture: ComponentFixture<InstaLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
