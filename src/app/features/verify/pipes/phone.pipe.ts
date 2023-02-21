import { Pipe, PipeTransform } from '@angular/core';
import { ChangeData } from '@capgo/ngx-intl-tel-input';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: ChangeData): string {
    if (!value.dialCode || !value.number) return '';

    const dialCode = value.dialCode;
    const number = value.number;

    return (
      dialCode +
      ' ' +
      number.substring(0, number.length - 3).replace(/\d/g, '*') +
      number.substring(number.length - 3, number.length)
    );
  }
}
