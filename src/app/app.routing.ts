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
  NotFoundComponent,
  PolicyComponent,
  TermsComponent,
  TestComponent,
} from './components';
import { LoggedInGuard } from './guards/loggedIn.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorkListComponent },
  { path: 'work/:id', component: WorkComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PolicyComponent },
  { path: 'terms-conditions', component: TermsComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '/404'},
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//
// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
