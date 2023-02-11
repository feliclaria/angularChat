import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthErrorMessageService } from './auth-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private authErrMsgService: AuthErrorMessageService
  ) {}

  get serverErrors(): Observable<string> {
    return this.authErrMsgService.errorMessages;
  }

  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.warn(error);
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email': {
            this.authErrMsgService.addErrorMessage(
              'The email addres is not valid or is already in use'
            );
            break;
          }
          default: {
          }
        }
      });
  }

  async logIn(email: string | null | undefined, password: string | null | undefined) {
    if (!email || !password) {
      this.authErrMsgService.addErrorMessage('Wrong email address or password');
      return;
    }
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
        this.authErrMsgService.addEmptyMessage();
      })
      .catch((error) => {
        console.warn(error);
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
          case 'auth/user-not-found': {
            this.authErrMsgService.addErrorMessage('Wrong email address or password');
            break;
          }
          case 'auth/too-many-requests': {
            this.authErrMsgService.addErrorMessage('Too many attempts. Try again later.');
            break;
          }
          default: {
            this.authErrMsgService.addEmptyMessage();
            break;
          }
        }
      });
  }

  async logInWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => console.warn(error));
  }

  async logOut() {
    await signOut(this.auth)
      .then(() => {
        this.router.navigateByUrl('/login');
      })
      .catch((error) => console.warn(error));
  }
}
