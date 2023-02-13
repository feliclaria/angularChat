import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async createUser(user: User) {
    const ref = doc(this.firestore, 'users', user.uid);
    await setDoc(ref, user, { merge: true }).catch((error) => console.warn(error));
  }

  async updateUser(user: User) {
    const ref = doc(this.firestore, 'users', user.uid);
    await updateDoc(ref, { ...user }).catch((error) => console.warn(error));
  }

  async deleteUser(user: User) {
    const ref = doc(this.firestore, 'users', user.uid);
    await deleteDoc(ref).catch((error) => console.warn(error));
  }
}
