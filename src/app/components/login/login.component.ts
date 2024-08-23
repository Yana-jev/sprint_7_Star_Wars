import { Component, inject } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);

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
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed:', error);
          this.openErrorDialog('Login failed. Please check your credentials and try again.');
        }
      );
}}

openErrorDialog(message: string): void {
  this.dialog.open(ErrorDialogComponent, {
    data: { message: message }
  });
}
}
