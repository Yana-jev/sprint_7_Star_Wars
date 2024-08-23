
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../data/services/auth.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['hasToken', 'isLoggedIn', 'logout']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLogged based on AuthService', () => {

    authServiceSpy.hasToken.and.returnValue(true);
    authServiceSpy.isLoggedIn.and.returnValue(of(true));

    fixture.detectChanges();

    expect(component.isLogged).toBeTrue();
    expect(authServiceSpy.hasToken).toHaveBeenCalled();
    expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
  });

  it('should call logout on authService when onLogout is called', () => {

    component.onLogout();
    
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});