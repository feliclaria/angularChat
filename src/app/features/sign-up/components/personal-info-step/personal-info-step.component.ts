import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { UserService } from 'src/app/services/user.service';

function invalidFileFormatValidator(types: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const splitFileName = control.value.split('.');
    if (!splitFileName || splitFileName.length < 2) return { invalidFileFormat: true };

    const extension = splitFileName.at(-1)!.toLowerCase();
    const typeMatches = types.some((type) => type.toLowerCase() === extension);

    return typeMatches ? null : { invalidFileFormat: true };
  };
}

@Component({
  selector: 'app-personal-info-step',
  templateUrl: './personal-info-step.component.html',
  styleUrls: []
})
export class PersonalInfoStepComponent implements OnInit, OnDestroy {
  @ViewChild('avatarInput')
  avatarInputRef?: ElementRef;

  uid?: string;

  userSub?: Subscription;

  avatarFile?: File;

  personalInfoForm = this.formBuilder.group({
    avatar: ['', [invalidFileFormatValidator(['png', 'jpeg', 'jpg'])]],
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

    this.avatarFile = file;
    this.personalInfoForm.controls.avatar.setValue(file ? file.name : '');
  }

  onRemoveAvatarClick() {
    this.avatarInputRef!.nativeElement.value = '';
    this.avatarFile = undefined;
    this.personalInfoForm.controls.avatar.setValue('');
  }

  onPersonalInfoSubmit() {
    if (!this.uid) return;

    if (this.avatarFile) {
      this.avatarService
        .uploadAvatar(this.uid, this.avatarFile)
        .pipe(
          switchMap(() => this.avatarService.getAvatarURL(this.uid!)),
          switchMap((avatarURL) =>
            this.userService.updateUserDoc({
              uid: this.uid!,
              photoURL: avatarURL
            })
          )
        )
        .subscribe();
    }

    this.userService
      .updateUserDoc({
        uid: this.uid,
        displayName: this.personalInfoForm.value.username!
      })
      .subscribe(() => this.router.navigateByUrl('/home'));
  }
}
