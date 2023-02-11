import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorMessageService {
  errorMessages = new Subject<string>();

  constructor() {}

  addErrorMessage(message: string) {
    this.errorMessages.next(message);
  }

  addEmptyMessage() {
    this.errorMessages.next('');
  }
}
