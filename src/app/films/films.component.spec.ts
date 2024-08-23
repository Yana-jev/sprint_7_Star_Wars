import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmsComponent } from './films.component';
import { ProfileService } from '../../data/services/profile.service';
import { of } from 'rxjs';
import { Film } from '../../data/interfaces/profile.interface';

// Мок-сервис ProfileService
class MockProfileService {
  getImageUrl(url: string, type: string): string {
    return `https://mock.url/${type}/${url.split('/').pop()}`;
  }
}

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let mockProfileService: MockProfileService;

  beforeEach(async () => {
    mockProfileService = new MockProfileService();

    await TestBed.configureTestingModule({
      imports: [FilmsComponent],
      providers: [
        { provide: ProfileService, useValue: mockProfileService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should convert number to Roman numeral', () => {
    expect(component.convertToRoman(1)).toBe('I');
    expect(component.convertToRoman(3)).toBe('III');
    expect(component.convertToRoman(4)).toBe('IV');
    expect(component.convertToRoman(9)).toBe('IX');
    expect(component.convertToRoman(10)).toBe('X');
    expect(component.convertToRoman(20)).toBe('XX');
    expect(component.convertToRoman(21)).toBe('21'); // For numbers not in the predefined list
  });
});