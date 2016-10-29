import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule, REACTIVE_FORM_DIRECTIVES, REACTIVE_FORM_PROVIDERS } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { runEffects } from '@ngrx/effects';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import {
  HomeComponent,
  WorkListComponent,
  ServiceComponent,
  AboutComponent,
  LoginComponent,
  AdminComponent,
  ContactComponent,
  WorkComponent,
  NotFoundComponent,
  TestComponent,
} from './components';

import reducer from './reducers';

import { FileUploadComponent } from './components/admin/forms/file-upload.component'; // TODO: move this
import { AddTechnologyComponent } from './components/admin/forms/add-technology.component'; // TODO: move this

import { FormEditWorkComponent } from './components/admin/forms/formEditWork.component';
import { FormEditTextComponent } from './components/admin/forms/formEditText.component';

import { WorkListItemComponent } from './components/work-list/work-list-item.component';

import { AUTH_PROVIDERS } from './authentication.service';
import { LoggedInGuard } from './guards/loggedIn.guard';
import { PopupComponent } from './shared/popup.component';
import { MessageComponent } from './shared/message.component';
import { MessageService } from './shared/message.service';
import { WorkService } from './services/work.service';
import { TextService } from './shared/text.service';
import { UIService } from './services/ui.service';
import { UIEffects } from './effects/ui';
import { TextEffects } from './effects/text';
import { WorkEffects } from './effects/work';
import { MessageEffects } from './effects/message';
import { FooterComponent } from './components/footer/footer.component';
import { PolicyComponent } from './components/policy/policy.component';
import { TermsComponent } from './components/terms/terms.component';

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
    WorkComponent,
    NotFoundComponent,
    AddTechnologyComponent,
    FileUploadComponent,
    FormEditWorkComponent,
    FormEditTextComponent,
    WorkListItemComponent,
    FooterComponent,
    PolicyComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {useHash: false}),
    StoreModule.provideStore({ router: routerReducer }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    FormsModule,
    HttpModule,
    JsonpModule,
    EffectsModule.run(UIEffects),
    EffectsModule.run(TextEffects),
    EffectsModule.run(WorkEffects),
    EffectsModule.run(MessageEffects),
    routing,
    ReactiveFormsModule,
  ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    LoggedInGuard,
    MessageService,
    provideStore(reducer),
    WorkService,
    TextService,
    UIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
