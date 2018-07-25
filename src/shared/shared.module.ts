import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './services/api.service';
import { NotifyService } from './utils/notify.service';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      enableHtml: true
    }),
    RouterModule,
  ],
  declarations: [],
  providers: [
    ApiService,
    NotifyService,
  ]
})
export class SharedModule { }
