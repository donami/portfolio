import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, REACTIVE_FORM_DIRECTIVES, REACTIVE_FORM_PROVIDERS } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

// import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';
import { HomeComponent } from './home-component/home.component';
import { WorkListComponent } from './work-list/work-list.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';

import { LoginComponent } from './login/login.component';

import { AUTH_PROVIDERS } from './authentication.service';
import { LoggedInGuard } from './guards/loggedIn.guard';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { FormEditTextComponent } from './admin/forms/formEditText.component';
import { PopupComponent } from './shared/popup.component';
import { MessageComponent } from './shared/message.component';

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
    FormEditTextComponent,
    PopupComponent,
    MessageComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
