import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: []
})
export class ProfileCardComponent {
  @Input() user?: User | null;

  profileForm = this.formBuilder.group({
    username: ['']
  });

  constructor(private formBuilder: FormBuilder) {}

  onUploadPhoto() {}

  onRemovePhoto() {}

  onEditProfileSubmit() {}
}
