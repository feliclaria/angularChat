import { Injectable } from '@angular/core';
import {
  ApplicationVerifier,
  Auth,
  authState,
  ConfirmationResult,
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithPhoneNumber,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { AvatarService } from './avatar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  confirmationResult: ConfirmationResult | undefined = undefined;

  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService,
    private avatarService: AvatarService
  ) {
    this.user$ = authState(this.auth).pipe(
      switchMap((user) => {
        if (user) return userService.getUserDoc(user.uid);
        else return of(null);
      })
    );
  }

  createAccount(username: string, email: string, password: string): Observable<boolean> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential) => {
        const uid = credential.user.uid;
        return this.userService.updateUserDoc({ uid, email, displayName: username });
      }),
      switchMap(() => from(this.router.navigateByUrl('/verify')))
    );
  }

  logIn(email: string, password: string): Observable<boolean> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(() => from(this.router.navigateByUrl('/home')))
    );
  }

  logInWithGoogle(): Observable<boolean> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      switchMap((credential) => {
        const user = credential.user;
        return this.userService.updateUserDoc({
          uid: user.uid,
          displayName: user.displayName ?? undefined,
          photoURL: user.photoURL ?? undefined
        });
      }),
      switchMap(() => from(this.router.navigateByUrl('/home')))
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

  validatePhoneNumber(verificationCode: string): Observable<boolean> {
    return from(this.confirmationResult!.confirm(verificationCode)).pipe(
      switchMap((credential) => {
        const user = credential.user;
        return this.userService.updateUserDoc({
          uid: user.uid,
          phoneNumber: user.phoneNumber ?? undefined
        });
      }),
      switchMap(() => from(this.router.navigateByUrl('/home')))
    );
  }

  logOut(): Observable<boolean> {
    return from(signOut(this.auth)).pipe(
      switchMap(() => from(this.router.navigateByUrl('/login')))
    );
  }

  private deleteUserData(uid: string): Observable<void> {
    return this.userService.getUserDoc(uid).pipe(
      switchMap((userDoc) => {
        if (!userDoc || !userDoc.photoURL) return of(null);
        return this.avatarService.deleteAvatar(uid);
      }),
      switchMap(() => this.userService.deleteUserDoc(uid))
    );
  }

  deleteAccount(password: string): Observable<boolean | null> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user || !user.email) return of(null);

        const credential = EmailAuthProvider.credential(user.email, password);
        return from(reauthenticateWithCredential(user, credential)).pipe(
          switchMap(() => this.deleteUserData(user.uid)),
          switchMap(() => from(user.delete())),
          switchMap(() => from(this.router.navigateByUrl('/login')))
        );
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user || !user.email) return of(null);

        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        return from(reauthenticateWithCredential(user, credential)).pipe(
          switchMap(() => from(updatePassword(user, newPassword)))
        );
      })
    );
  }
}
