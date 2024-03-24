import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationPageComponent } from './verification-page/verification-page.component';
import { FormsModule } from '@angular/forms';

import { NgOtpInputModule } from  'ng-otp-input';
@NgModule({
  declarations: [
    VerificationPageComponent
  ],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    FormsModule,
    NgOtpInputModule
  ]
})
export class VerificationModule { }
