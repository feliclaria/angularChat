import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AvatarService } from 'src/app/services/avatar.service';
import { UserService } from 'src/app/services/user.service';
import { fileMaxSizeValidator } from '../../validators/fileMaxSizeValidator';
import { fileTypeValidator } from '../../validators/fileTypeValidator';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: []
})
export class ProfileCardComponent {
  @Input() user?: User | null;

  avatarForm = this.formBuilder.group({
    avatarSize: [0, [fileMaxSizeValidator(1e6)]],
    avatarType: ['', [fileTypeValidator(['image/png', 'image/jpeg'])]]
  });

  profileForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private avatarService: AvatarService
  ) {}

  onFileSelected(event: Event) {
    const file = (<HTMLInputElement>event.target).files?.[0];
    if (!file) return;

    const avatarFormControls = this.avatarForm.controls;
    avatarFormControls.avatarSize.setValue(file.size);
    avatarFormControls.avatarType.setValue(file.type);

    if (
      !this.user ||
      this.avatarForm.hasError('filemaxsize', 'avatarSize') ||
      this.avatarForm.hasError('filetype', 'avatarType')
    )
      return;

    const uid = this.user.uid;
    this.avatarService
      .uploadAvatar(uid, file)
      .pipe(
        switchMap(() => this.avatarService.getAvatarURL(uid)),
        switchMap((avatarURL) =>
          this.userService.updateUserDoc({ uid, photoURL: avatarURL ?? undefined })
        )
      )
      .subscribe();
  }

  onRemovePhoto() {
    if (!this.user) return;
    const uid = this.user.uid;

    this.avatarService
      .deleteAvatar(uid)
      .pipe(switchMap(() => this.userService.deleteUserField(uid, 'photoURL')))
      .subscribe();
  }

  onEditProfileSubmit() {
    if (!this.user || !this.profileForm.value.username) return;

    this.userService
      .updateUserDoc({
        uid: this.user.uid,
        displayName: this.profileForm.value.username
      })
      .subscribe(() => {
        this.profileForm.reset();
      });
  }
}
