import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => console.warn(error));
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => console.warn(error));
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
