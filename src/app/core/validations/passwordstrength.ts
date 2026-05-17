//  This interface defines the structure of the validation result, including the strength of the password based on various criteria and feedback messages for any unmet requirements
//  The passwordStrength object contains boolean properties that indicate whether the password meets specific criteria such as minimum length, presence of uppercase letters, lowercase letters, numbers, and special characters
//  The feedback array contains messages that provide guidance to the user on how to improve their password if it does not meet the required criteria
//  This interface can be used to provide detailed feedback to users when they are creating or updating their passwords, helping them understand what is required for a strong password and how to meet those requirements
//  Example usage: When validating a password, the function can return an object that adheres to this interface, allowing the application to display specific feedback to the user about which criteria their password does not meet
//  The function is exported so that it can be imported and used in other parts of the application where password strength validation is needed
// Example usage in a form control:
//  this.form = this.fb.group({
//    password: ['', [Validators.required, PasswordStrengthValidator()]]
//  });
// emaple of the validation result object:
//  {
//    passwordStrength: {
//      hasMinLength: true,
//      hasUpperCase: false,
//      hasLowerCase: true,
//      hasNumeric: false,
//      hasSpecial: true
//    },
//    feedback: [
//      'Add at least one uppercase letter (A-Z)',
//      'Add at least one number (0-9)'
//    ]
//  }
// example of validation result in html template:
//  <div *ngIf="form.get('password').errors?.['feedback']">
//    <ul>
//      <li *ngFor="let message of form.get('password').errors?.['feedback']">{{ message }}</li>
//    </ul>
//  </div>
// ==========================================================
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
//  Interface to represent the result of password validation
//  This interface defines the structure of the validation result, including the strength of the password based on various criteria and   feedback messages for any unmet requirements
//==========================================================
export interface PasswordValidationResult {
  passwordStrength: {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumeric: boolean;
    hasSpecial: boolean;
  };
  feedback: string[];
}

//Custom validator function to check password strength
//  This function checks if the password meets specific criteria such as minimum length, presence of uppercase letters, lowercase letters, numbers, and special characters
//===========================================================
export function PasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null;
    }

    const feedback: string[] = [];
    const validation = {
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumeric: false,
      hasSpecial: false,
    };

    if (password.length >= 6 && password.length <= 12) {
      validation.hasMinLength = true;
    } else {
      feedback.push('Password must be at least 6 characters and not exceed 12 characters');
    }

    if (/[A-Z]/.test(password)) {
      validation.hasUpperCase = true;
    } else {
      feedback.push('Add at least one uppercase letter (A-Z)');
    }

    if (/[a-z]/.test(password)) {
      validation.hasLowerCase = true;
    } else {
      feedback.push('Add at least one lowercase letter (a-z)');
    }

    if (/\d/.test(password)) {
      validation.hasNumeric = true;
    } else {
      feedback.push('Add at least one number (0-9)');
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      validation.hasSpecial = true;
    } else {
      feedback.push('Add at least one special character (e.g., !@#$%^&*)');
    }

    const isValid = Object.values(validation).every((requirement) => requirement);

    return isValid
      ? null
      : {
          feedback,
        };
  };
}
