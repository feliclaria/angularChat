import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileMaxSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value > maxSize ? { filemaxsize: true } : null;
  };
}
