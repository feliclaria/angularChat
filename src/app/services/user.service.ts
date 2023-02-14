import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore, setDoc, docData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getUser(user: User): Observable<User> {
    const ref = doc(this.firestore, 'users', user.uid);
    return docData(ref) as Observable<User>;
  }

  updateUser(user: User) {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user, { merge: true }));
  }

  deleteUser(user: User) {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(deleteDoc(ref));
  }
}
