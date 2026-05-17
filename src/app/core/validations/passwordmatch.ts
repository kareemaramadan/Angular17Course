//This file contains a custom validator function for checking if the password and confirm password fields match in an Angular form. The function takes an AbstractControl as an argument, which represents the password field, and returns a ValidatorFn that can be used to validate the confirm password field. If the confirm password does not match the password, it returns an object with a key of 'passwordMismatch' set to true; otherwise, it returns null, indicating that the validation passed.
//The function is designed to be used in an Angular reactive form, where it can be applied to the confirm password field to ensure that the user has entered the same password in both fields before submitting the form.
//The function takes an AbstractControl as an argument, which represents the password field in the form
//It returns a ValidatorFn, which is a function that takes an AbstractControl (the confirm password field) and returns either null (if the validation passes) or an object with a key of 'passwordMismatch' set to true (if the validation fails)
//The function compares the value of the confirm password field with the value of the password field. If they do not match, it returns an object indicating that there is a password mismatch; otherwise, it returns null, indicating that the validation passed.

//usage example in Reactive Forms:
//this.confirmPassword = new FormControl('', checkPasswordMatch(this.password));
//usage example in reactive forms template:
//<input type="password" formControlName="confirmPassword" [checkPasswordMatch]="password">
//usage example in Template-Driven Forms:
//<input type="password" name="confirmPassword" ngModel checkPasswordMatch="password">
//usage example in Template-Driven Forms with a reference variable:
//<input type="password" name="confirmPassword" ngModel #confirmPassword="ngModel" [checkPasswordMatch]="password">
//============================================================

import { AbstractControl, ValidatorFn } from '@angular/forms';
// The function takes an AbstractControl as an argument, which represents the password field in the form
export function checkPasswordMatch(pass: AbstractControl): ValidatorFn {
  return (confirm: AbstractControl): null | { [key: string]: boolean } => {
    const password = pass.value;
    const confirmPassword = confirm.value;

    if (confirmPassword !== password) {
      return { passwordMismatch: true };
      console.log(confirmPassword + '' + password);
    }
    return null;
  };
}
