import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'angularChat';

  constructor(private themeService: ThemeService, public authService: AuthService) {}

  ngOnInit() {
    this.themeService.setTheme(this.themeService.getTheme());
  }
}
