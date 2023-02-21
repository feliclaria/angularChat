import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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

  onPersonalInfoSubmit() {
    if (!this.uid) return;

    this.userService
      .setUser({
        uid: this.uid,
        displayName: this.personalInfoForm.value.username!
      })
      .subscribe(() => this.router.navigateByUrl('/home'));
  }
}
