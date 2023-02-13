import { Component } from '@angular/core';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: UserProfile = {
    uid: sessionStorage.getItem('user-uid')!,
    name: sessionStorage.getItem('user-name')!,
    avatar: sessionStorage.getItem('user-avatar')
  };

  constructor(private authService: AuthService) {}

  onClick() {
    this.authService.logOut();
  }
}
