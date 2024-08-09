import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrashipInfoComponent } from './straship-info.component';

describe('StrashipInfoComponent', () => {
  let component: StrashipInfoComponent;
  let fixture: ComponentFixture<StrashipInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrashipInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrashipInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
