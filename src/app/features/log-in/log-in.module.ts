import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { LogInRoutingModule } from './log-in-routing.module';
import { LogInComponent } from './log-in.component';

@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule, LogInRoutingModule, SharedModule]
})
export class LogInModule {}
