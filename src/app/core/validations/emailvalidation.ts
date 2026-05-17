// Custom validator function to validate email addresses
// This function returns a ValidatorFn that checks if the control's value matches a valid email pattern
// The email pattern used here is a simple regex that checks for the presence of characters before and after the '@' symbol, and a valid domain structure
// If the control's value does not match the email pattern, the function returns an object with the key 'invalidEmail' set to true
// If the control's value is valid, the function returns null, indicating that there are no validation errors
// Usage: This custom validator can be used in Angular forms to validate email input fields by adding it to the list of validators for the form control
// Example usage in a form control:
// this.form = this.fb.group({
//   email: ['', [Validators.required, Emailvalidation()]]
// });
// Note: This is a basic email validation regex and may not cover all valid email formats, but it serves as a common pattern for most email addresses
// The function is exported so that it can be imported and used in other parts of the application where email validation is needed
//==================================================================

import { AbstractControl, ValidatorFn } from '@angular/forms';
export function Emailvalidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}
