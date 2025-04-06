import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
//    if (this.loginForm.invalid) return;
    const { email } = this.loginForm.value;

    this.authService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        if (err.status === 404) {
          const confirmCreate = confirm(
            'Usuario no existe. ¿Deseas crearlo?'
          );
          if (confirmCreate) {
            this.authService.createUser({ email }).subscribe({
              next: () => {
                this.router.navigate(['/tasks']);
              },
              error: (err2) => console.error(err2)
            });
          }
        } else {
          console.error(err);
        }
      }
    });
  }
}
