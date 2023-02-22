import { Injectable } from '@angular/core';
import {
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  docData,
  getDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  private getUserRef(uid: string): DocumentReference {
    return doc(this.firestore, 'users', uid);
  }

  getUserDoc(uid: string): Observable<User | null> {
    const ref = this.getUserRef(uid);

    return from(getDoc(ref)).pipe(
      map((doc) => {
        if (!doc.exists()) return null;
        return doc.data();
      })
    ) as Observable<User | null>;
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
