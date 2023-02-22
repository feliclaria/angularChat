import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() user: User | null = null;

  constructor(private authService: AuthService) {}

  onLogOutClick() {
    this.authService.logOut().subscribe();
  }
}
