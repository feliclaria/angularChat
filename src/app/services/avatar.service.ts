import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  UploadResult,
  StorageReference,
  deleteObject
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor(private storage: Storage) {}

  private getAvatarRef(uid: string): StorageReference {
    return ref(this.storage, `avatars/${uid}`);
  }

  getAvatarURL(uid: string): Observable<string> {
    return from(getDownloadURL(this.getAvatarRef(uid)));
  }

  uploadAvatar(uid: string, avatar: File): Observable<UploadResult> {
    return from(uploadBytes(this.getAvatarRef(uid), avatar));
  }

  deleteAvatar(uid: string): Observable<void> {
    return from(deleteObject(this.getAvatarRef(uid)));
  }
}
