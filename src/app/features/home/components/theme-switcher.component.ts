import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        [checked]="themeService.getTheme() === 'dark'"
        (change)="toggleTheme()"
      />
    </div>
  `,
  styles: []
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    const prevTheme = this.themeService.getTheme();
    const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }
}
