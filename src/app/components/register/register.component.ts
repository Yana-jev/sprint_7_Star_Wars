import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { AuthService } from '../../../data/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

registerForm!: FormGroup

constructor(private authService: AuthService, private router: Router, public dialog: MatDialog){

}

ngOnInit(): void {
  this.registerForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'confirmPassword': new FormControl('', [Validators.required])
  })

}
submitRegister() {
  if (this.registerForm.valid) {
    const { confirmPassword, ...userData } = this.registerForm.value;
    this.authService.signUp(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        this.openErrorDialog('Registration failed. Please check your credentials and try again.');
      }
    );
  }
}

openErrorDialog(message: string): void {
  this.dialog.open(ErrorDialogComponent, {
    data: { message: message }
  });
}
}
