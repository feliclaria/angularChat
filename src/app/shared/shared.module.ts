import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TextDividerComponent } from './text-divider.component';

@NgModule({
  declarations: [TextDividerComponent],
  imports: [CommonModule],
  exports: [ReactiveFormsModule, NgbModule, TextDividerComponent]
})
export class SharedModule {}
