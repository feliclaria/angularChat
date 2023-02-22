import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: []
})
export class ProfileCardComponent {
  @Input() user?: User | null;

  profileForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  onUploadPhoto() {}

  onRemovePhoto() {}

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
