import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-bubble-right',
  template: `
    <div class="small d-inline-block bg-primary rounded-3 ps-2 p-1">
      <p class="text-start text-light mb-0 me-2">{{ text }}</p>
      <p class="small text-end text-light fw-light mb-0 lh-1 user-select-none">
        {{ date | date : 'HH:mm' }}
      </p>
    </div>
  `,
  styleUrls: []
})
export class MessageBubbleRightComponent {
  @Input() text: string = '';
  @Input() date: Date = new Date();
}
