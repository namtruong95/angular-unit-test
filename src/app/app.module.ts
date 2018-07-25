import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { RootScopeService } from 'app/services/root-scope';
import { BaseRootScopeService } from 'shared/utils/base-root-scope.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
  ],
  providers: [
    {
      provide: RootScopeService,
      useExisting: BaseRootScopeService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
