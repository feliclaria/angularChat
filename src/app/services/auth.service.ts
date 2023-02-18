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
  signOut,
  UserCredential
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize, from, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  confirmationResult: ConfirmationResult | undefined = undefined;

  constructor(private auth: Auth, private router: Router, private userService: UserService) {
    this.user$ = authState(this.auth).pipe(
      switchMap((user) => {
        if (user) return userService.getUser(user.uid);
        else return of(null);
      })
    );
  }

  signUp(displayName: string, email: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential) => {
        const uid = credential.user.uid;
        return this.userService.setUser({ uid, displayName, email });
      }),
      finalize(() => this.router.navigateByUrl('/home'))
    );
  }

  logIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      finalize(() => this.router.navigateByUrl('/home'))
    );
  }

  logInWithGoogle(): Observable<void> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      switchMap((credential) => {
        const user = credential.user;
        return this.userService.setUser({
          uid: user.uid,
          displayName: user.displayName ?? undefined,
          photoURL: user.photoURL ?? undefined
        });
      }),
      finalize(() => this.router.navigateByUrl('/home'))
    );
  }

  sendVerificationCode(
    phoneNumber: string,
    appVerifier: ApplicationVerifier
  ): Observable<ConfirmationResult> {
    return from(linkWithPhoneNumber(this.auth.currentUser!, phoneNumber, appVerifier)).pipe(
      tap((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      })
    );
  }

  validatePhoneNumber(verificationCode: string): Observable<void> {
    return from(this.confirmationResult!.confirm(verificationCode)).pipe(
      switchMap((credential) => {
        const user = credential.user;
        return this.userService.setUser({
          uid: user.uid,
          phoneNumber: user.phoneNumber ?? undefined
        });
      }),
      finalize(() => this.router.navigateByUrl('/home'))
    );
  }

  logOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(finalize(() => this.router.navigateByUrl('/login')));
  }
}
