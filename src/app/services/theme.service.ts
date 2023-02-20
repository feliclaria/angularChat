import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private getStoredTheme() {
    return localStorage.getItem('theme');
  }

  private getAutoTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getTheme() {
    return this.getStoredTheme() ?? this.getAutoTheme();
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
