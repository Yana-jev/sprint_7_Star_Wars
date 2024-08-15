import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

registerForm!: FormGroup



constructor(private authService: AuthService){

}

ngOnInit(): void {
  this.registerForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })

}
submitRegister() {
  if (this.registerForm.valid) {
    this.authService.signUp(this.registerForm.value).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Здесь можно добавить логику для перенаправления или автоматического логина
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}

}
