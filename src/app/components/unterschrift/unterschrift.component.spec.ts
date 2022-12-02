import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnterschriftComponent } from './unterschrift.component';

describe('UnterschriftComponent', () => {
  let component: UnterschriftComponent;
  let fixture: ComponentFixture<UnterschriftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnterschriftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnterschriftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
