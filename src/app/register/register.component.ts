import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male'],
      role: [''],
      isActive: [false, Validators.required]
    })
  }

  proceedRegistration() {
    if (this.registrationForm.valid) {
      this.service.proceedRegistration(this.registrationForm.value).subscribe(res => {
        this.toastr.success('please contact the admin for approval', 'registered successfully!!')
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning('please send the valid data!')
    }
  }
}
