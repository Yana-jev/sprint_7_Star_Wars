import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup



  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    })

  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful:', response);
          // Здесь можно добавить логику для перенаправления или хранения токена
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );

}
  }



}
