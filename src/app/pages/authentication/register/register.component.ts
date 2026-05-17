import { Component, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPasswordMatch } from '../../../core/validations/passwordmatch';
import { Emailvalidation } from '../../../core/validations/emailvalidation';
import { AuthServiceService } from '../../../core/services/authService.service';
import { IRegister } from '../../../core/Interfaces/IRegister';

import { NgxSpinnerService } from 'ngx-spinner';
import { GuardResult, MaybeAsync, Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { SharedModule } from '../../../Shared/Module/shared/shared-module';
import { IDeactivate } from '../../../core/Interfaces/ideactivate';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { PasswordStrengthValidator } from '../../../core/validations/passwordstrength';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [SharedModule],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements IDeactivate {
  constructor(
    private _authService: AuthServiceService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _confirmationService: ConfirmationService,
  ) {
    this.initFormControls();
    this.initFormGroup();
  }
  // Define form controls and form group
  //====================================
  name!: FormControl;
  avatar!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  registerform!: FormGroup;
  IsExit: boolean = false;

  // Initialize form controls with validators
  //===========================================
  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]);
    ((this.avatar = new FormControl('')),
      (this.email = new FormControl('', [Validators.required, Emailvalidation()])));
    this.password = new FormControl('', [
      Validators.required,
      // Validators.minLength(6),
      // Validators.maxLength(20),
      PasswordStrengthValidator(),
    ]);
    this.confirmPassword = new FormControl('', checkPasswordMatch(this.password));
  }

  // Initialize form group with form controls
  //===========================================
  initFormGroup(): void {
    this.registerform = new FormGroup({
      name: this.name,
      avatar: this.avatar,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  // Handle form submission
  //=======================
  Onsubmit() {
    if (!this.registerform.valid) {
      // console.log('the registrationform is not valid:' + this.registerform);
      // console.log('the registrationform value during not validaion:' + this.registerform.value);
      this.registerform.markAllAsTouched();
      this.registerform.markAllAsDirty();
      Object.keys(this.registerform.controls).forEach((key) => {
        this.registerform.controls[key];
        // console.log(`${key}:`, this.registerform.controls[key].value);
      });
    } else {
      this.registerationApi(this.registerform.value);
    }

    if (this.registerform.get('password')?.errors) {
      Object.keys(this.registerform.get('password')?.errors || {}).forEach((key) => {
        //console.log(`Password error (${key}):`, this.registerform.get('password')?.errors?.[key]);
      });
    }
  }

  registerationApi(data: IRegister): void {
    this._spinner.show();
    //console.log(data);
    this._authService.register(data).subscribe({
      next: (response) => {
        this._spinner.hide();
        this.showToast('success', 'Success', 'your account is created successfully');
        timer(2000).subscribe(() => {
          this._authService
            .login({
              email: this.registerform.value.email,
              password: this.registerform.value.password,
            })
            .subscribe({
              next: (loginResponse) => {
                this._router.navigate(['user']);
              },
            });
        });
      },
      error: (error) => {
        this._spinner.hide();
        //console.error('Registration failed:', error);
        this.showToast('error', 'Error', 'System failed to create the account.');
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

  canExit(): MaybeAsync<GuardResult> {
    if (this.registerform.dirty) {
      return this.confirm();
    }
    return true; // No unsaved changes, allow navigation
  }

  confirm(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this._confirmationService.confirm({
        message: 'You have unsaved changes. Do you really want to leave?',
        header: 'Confirm Navigation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes, Leave',
        rejectLabel: 'No, Stay',
        accept: () => {
          resolve(true); // User accepted, allow navigation
        },
        reject: () => {
          resolve(false); // User rejected, prevent navigation
        },
      });
    });
  }
}
