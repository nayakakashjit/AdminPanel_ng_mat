import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { SnackBarService } from '@app/core/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private formSubmitAttempt!: boolean;

  // email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBService:SnackBarService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.loggedResponse.subscribe((res)=>{
      console.log(res);
      if (res.data) {
        const type = res.status === "success" ? 'success' : "error"
        this.snackBService.openSnackBar(res.message, type);
      }
    })
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  public isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  public onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

}
