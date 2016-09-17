import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-component/home.component';
import { WorkListComponent } from './work-list/work-list.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { LoggedInGuard } from './guards/loggedIn.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorkListComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] }
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//
// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
