import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  userData!: any

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    sessionStorage.clear()
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.userName).subscribe(res => {
        this.userData = res
        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('userName', this.userData.id)
            sessionStorage.setItem('userRole', this.userData.userRole)
            this.router.navigate([''])
          } else {
            this.toastr.warning('please contact admin', 'in active user')
          }
        } else {
          this.toastr.warning('incorrect password')
        }
      })
    }
  }
}
