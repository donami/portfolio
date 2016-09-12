import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';
import { HomeComponent } from './home-component/home.component';
import { WorkListComponent } from './work-list/work-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
