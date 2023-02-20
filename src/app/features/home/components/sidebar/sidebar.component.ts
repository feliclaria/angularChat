import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent {
  @Input() user: User | undefined = undefined;

  constructor(private authService: AuthService) {}

  onLogOutClick() {
    this.authService.logOut().subscribe();
  }
}
