import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AboutComponent,
  ServiceComponent,
  ContactComponent,
  AdminComponent,
  LoginComponent,
  HomeComponent,
  WorkComponent,
  WorkListComponent,
  TestComponent,
} from './components';
import { LoggedInGuard } from './guards/loggedIn.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorkListComponent },
  { path: 'work', component: WorkComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'test', component: TestComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] }
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//
// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
