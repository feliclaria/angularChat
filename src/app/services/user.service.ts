import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore, setDoc, docData } from '@angular/fire/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  private getUserRef(uid: string) {
    return doc(this.firestore, 'users', uid);
  }

  getUserDoc(uid: string): Observable<User> {
    const ref = this.getUserRef(uid);
    return docData(ref) as Observable<User>;
  }

  updateUserDoc(user: User): Observable<void> {
    const ref = this.getUserRef(user.uid);
    return from(setDoc(ref, user, { merge: true }));
  }

  deleteUserDoc(uid: string): Observable<void> {
    const ref = this.getUserRef(uid);
    return from(deleteDoc(ref));
  }
}
