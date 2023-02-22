import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-bubble-left',
  template: `
    <div class="small d-inline-block bg-body-tertiary rounded-3 border ps-2 p-1">
      <p
        *ngIf="username !== undefined"
        class="text-start fw-semibold my-0 me-2"
        [ngClass]="{
          'text-success': !!username,
          'text-muted': !username
        }"
      >
        {{ !!username ? username : '(deleted)' }}
      </p>
      <p class="text-start mb-0 me-2">{{ text }}</p>
      <p class="small text-end text-muted fw-light mb-0 lh-1 user-select-none">
        {{ date | date : 'HH:mm' }}
      </p>
    </div>
  `,
  styleUrls: []
})
export class MessageBubbleLeftComponent {
  @Input() username?: string;
  @Input() text: string = '';
  @Input() date: Date = new Date();
}
