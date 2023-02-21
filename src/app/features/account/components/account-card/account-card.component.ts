import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styles: []
})
export class AccountCardComponent {
  @Input() user?: User;
}
