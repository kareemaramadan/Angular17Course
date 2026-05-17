import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KeyValuePipe,
    JsonPipe,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    MessageModule,
    FloatLabelModule,
    ToastModule,
    RippleModule,
    NgxSpinnerModule,
    AutoFocusModule,
    ConfirmDialogModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    KeyValuePipe,
    JsonPipe,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    MessageModule,
    FloatLabelModule,
    ToastModule,
    RippleModule,
    NgxSpinnerModule,
    AutoFocusModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService, CookieService],
})
export class SharedModule {}
