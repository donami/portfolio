import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, REACTIVE_FORM_DIRECTIVES, REACTIVE_FORM_PROVIDERS } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

// import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';

import {
  HomeComponent,
  WorkListComponent,
  ServiceComponent,
  AboutComponent,
  LoginComponent,
  AdminComponent,
  ContactComponent,
  TestComponent,
} from './components';


import { AUTH_PROVIDERS } from './authentication.service';
import { LoggedInGuard } from './guards/loggedIn.guard';
import { PopupComponent } from './shared/popup.component';
import { MessageComponent } from './shared/message.component';
import { MessageService } from './shared/message.service';
import { WorkService } from './services/work.service';
import { TextService } from './shared/text.service';


import effects from './effects';
import reducer from './reducers';
import actions from './actions';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkListComponent,
    ServiceComponent,
    AboutComponent,
    LoginComponent,
    AdminComponent,
    ContactComponent,
    PopupComponent,
    MessageComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {useHash: false}),
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
  ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    REACTIVE_FORM_PROVIDERS,
    LoggedInGuard,
    MessageService,
    provideStore(reducer),
    runEffects(effects),
    actions,
    WorkService,
    TextService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
