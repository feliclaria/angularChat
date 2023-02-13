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
    name: sessionStorage.getItem('user-display-name')!,
    avatar: sessionStorage.getItem('user-photo-url')
  };
  mockUser: UserProfile = {
    name: 'Madeline',
    avatar: 'https://tiermaker.com/images/chart/chart/celeste-icons--603740/mad1png.png'
  };

  constructor(private authService: AuthService) {}

  onClick() {
    this.authService.logOut();
  }
}
