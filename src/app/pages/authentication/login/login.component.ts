import { SharedModule } from './../../../Shared/Module/shared/shared-module';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Emailvalidation } from '../../../core/validations/emailvalidation';
import { AuthServiceService } from '../../../core/services/authService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ILogin, ILoginResponse } from '../../../core/Interfaces/ILogin';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { UserDataService } from '../../../core/services/UserData.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [SharedModule],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  btn: string | undefined;
  constructor(
    private _authService: AuthServiceService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _cookieService: CookieService,
    private _userData: UserDataService,
  ) {
    this.initFormControls();
    this.initFormGroup();
    // const isAccessTokenExists: boolean = this._cookieService.check('access_token');
    // const accessTokenValue: string = this._cookieService.get('access_token');
    // // console.log('Browser - Access token exists in Login Form:', isAccessTokenExists);
    // if (isAccessTokenExists && accessTokenValue) {
    //   //   console.log('Browser - Access token value in Login Form:', accessTokenValue);
    //   this._router.navigate(['user/home']);
    // }
  }
  // Define form controls and form group
  //====================================
  email!: FormControl;
  password!: FormControl;
  loginform!: FormGroup;

  // Initialize form controls with validators
  //===========================================
  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Emailvalidation()]);
    this.password = new FormControl('', [Validators.required]);
  }

  // Initialize form group with form controls
  //===========================================
  initFormGroup(): void {
    this.loginform = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  // Handle form submission
  //=======================
  Onsubmit() {
    if (!this.loginform.valid) {
      // console.log('the loginform is not valid:' + this.loginform);
      // console.log('the loginform value during not validaion:' + this.loginform.value);
      this.loginform.markAllAsTouched();
      this.loginform.markAllAsDirty();
      Object.keys(this.loginform.controls).forEach((key) => {
        this.loginform.controls[key];
        // console.log(`${key}:`, this.loginform.controls[key].value);
      });
    } else {
      this.loginApi(this.loginform.value);
    }

    if (this.loginform.get('password')?.errors) {
      Object.keys(this.loginform.get('password')?.errors || {}).forEach((key) => {
        //console.log(`Password error (${key}):`, this.loginform.get('password')?.errors?.[key]);
      });
    }
  }

  async loginApi(data: ILogin) {
    this._spinner.show();
    //console.log(data);
    this._authService.login(data).subscribe({
      next: (response: ILoginResponse) => {
        //localStorage.setItem('access_token', response.access_token);
        this._cookieService.set('access_token', response.access_token, 1, '/', '', true, 'Lax'); // Set cookie to expire in 7 days
        this._spinner.hide();
        this.showToast('success', 'Success', 'You are logged in  successfully');
        console.log('Login successful:', response);
        this._userData.username.next(this.email.value);
        this._router.navigate(['user/']);
      },
      error: (error) => {
        this._spinner.hide();
        console.error('Login failed:', error);
        this.showToast('error', 'Error', 'Invalid email or password.');
      },
    });
  }

  showToast(severity: string, summary: string, messagedetail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: messagedetail,
    });
  }

  Oncookie() {
    const checkaccessToken = this._cookieService.check('access_token');
    console.log('AuthGuard: Access token is found :', checkaccessToken);

    const accessToken = this._cookieService.get('access_token');
    console.log(accessToken.toString());
  }
}
