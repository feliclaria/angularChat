import { Injectable } from '@angular/core';
import {
  ApplicationVerifier,
  Auth,
  authState,
  ConfirmationResult,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithPhoneNumber,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<User | null>;

  confirmationResult: ConfirmationResult | undefined = undefined;

  constructor(private auth: Auth, private router: Router, private userService: UserService) {
    this.user$ = authState(this.auth).pipe(
      switchMap((user) => {
        if (user) return userService.getUser(user);
        else return of(null);
      })
    );
  }

  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    );
  }

  logIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    );
  }

  logInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    );
  }

  sendVerificationCode(phoneNumber: string, appVerifier: ApplicationVerifier) {
    return from(linkWithPhoneNumber(this.auth.currentUser!, phoneNumber, appVerifier)).pipe(
      tap((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      })
    );
  }

  validatePhoneNumber(verificationCode: string) {
    return from(this.confirmationResult!.confirm(verificationCode)).pipe(
      switchMap((credential) => {
        const user = credential.user;
        const newUser: User = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        };
        return this.userService.updateUser(newUser);
      }),
      tap(() => {
        this.router.navigateByUrl('/home');
      })
    );
  }

  logOut() {
    return from(signOut(this.auth)).pipe(tap(() => this.router.navigateByUrl('/login')));
  }
}
