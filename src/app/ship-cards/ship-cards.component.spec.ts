import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipCardsComponent } from './ship-cards.component';

describe('ShipCardsComponent', () => {
  let component: ShipCardsComponent;
  let fixture: ComponentFixture<ShipCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
