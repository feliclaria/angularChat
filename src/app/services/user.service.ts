import { Injectable } from '@angular/core';
import {
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  docData,
  getDoc,
  DocumentReference,
  updateDoc,
  deleteField
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
    return docData(ref).pipe(
      map((data) => {
        if (!data) return null;
        return data;
      })
    ) as Observable<User | null>;
  }

  deleteUserField(uid: string, field: string): Observable<void> {
    const ref = this.getUserRef(uid);
    return from(updateDoc(ref, { [field]: deleteField() }));
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
