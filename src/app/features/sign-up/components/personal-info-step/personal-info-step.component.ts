import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-info-step',
  templateUrl: './personal-info-step.component.html',
  styleUrls: []
})
export class PersonalInfoStepComponent implements OnInit, OnDestroy {
  uid?: string;

  userSub?: Subscription;

  personalInfoForm = this.formBuilder.group({
    avatar: [<File>{}],
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private avatarService: AvatarService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) this.uid = user.uid;
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  onFileChange(event: Event) {
    const file = (<HTMLInputElement>event.target).files?.[0];
    if (!file) return;

    this.personalInfoForm.controls.avatar.setValue(file);
  }

  onPersonalInfoSubmit() {
    if (!this.uid) return;

    if (this.personalInfoForm.value.avatar) {
      this.avatarService
        .uploadAvatar(this.uid, this.personalInfoForm.value.avatar)
        .pipe(
          switchMap(() => this.avatarService.getAvatarURL(this.uid!)),
          switchMap((avatarURL) =>
            this.userService.setUser({
              uid: this.uid!,
              photoURL: avatarURL
            })
          )
        )
        .subscribe();
    }

    this.userService
      .setUser({
        uid: this.uid,
        displayName: this.personalInfoForm.value.username!
      })
      .subscribe(() => this.router.navigateByUrl('/home'));
  }
}
