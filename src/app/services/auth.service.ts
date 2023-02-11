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
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logInErrors = new Subject<string>();

  constructor(private auth: Auth, private router: Router) {}

  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => console.warn(error));
  }

  async logIn(email: string | null | undefined, password: string | null | undefined) {
    if (!email || !password) {
      this.logInErrors.next('Wrong email address or password');
      return;
    }
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
        this.logInErrors.next('');
      })
      .catch((error) => {
        console.warn(error);
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
          case 'auth/user-not-found': {
            this.logInErrors.next('Wrong email address or password');
            break;
          }
          case 'auth/too-many-requests': {
            this.logInErrors.next('Too many attempts. Try again later.');
            break;
          }
          default: {
            this.logInErrors.next('');
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
