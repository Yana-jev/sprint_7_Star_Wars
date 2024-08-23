import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilotsComponent } from './pilots.component';
import { ProfileService } from '../../../data/services/profile.service';

// Начинаем описание нашего теста
describe('PilotsComponent', () => {
  let component: PilotsComponent; 
  let fixture: ComponentFixture<PilotsComponent>; 
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;


  beforeEach(async () => {

    const spy = jasmine.createSpyObj('ProfileService', ['getImageUrl']);


    await TestBed.configureTestingModule({
      imports: [PilotsComponent], 
      providers: [
        { provide: ProfileService, useValue: spy } 
      ]
    }).compileComponents(); 


    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    profileServiceSpy.getImageUrl.and.returnValue('mock-image-url');

    fixture.detectChanges(); 
  });


  it('should create', () => {
    expect(component).toBeTruthy(); 
  });




  it('should set default image on error', () => {

    const event = { target: { src: '' } } as unknown as Event;
    component.setDefaultImage(event); 
    

    expect((event.target as HTMLImageElement).src).toBe('assets/noship.jpg');
  });
});