import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-divider',
  template: `
    <div class="d-flex align-items-center my-2 mx-2">
      <div class="col"><hr /></div>
      <div class="col-auto small text-muted px-4">{{ content }}</div>
      <div class="col"><hr /></div>
    </div>
  `,
  styles: []
})
export class TextDividerComponent {
  @Input() content: string | null | undefined = '';
}
